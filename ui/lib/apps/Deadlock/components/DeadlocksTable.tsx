import React, { useState } from 'react'
import {
  AnimatedSkeleton,
  AutoRefreshButton,
  Card,
  CardTable,
  HighlightSQL,
} from '@lib/components'
import { useClientRequest } from '@lib/utils/useClientRequest'
import client from '@lib/client'
import { useMemoizedFn } from 'ahooks'

function DeadlocksTable() {
  const { data, isLoading, error } = useClientRequest((reqConfig) =>
    client.getInstance().deadlockListGet(reqConfig)
  )
  let [items, setItems] = useState(data!)

  const handleRowClick = useMemoizedFn(
    (rec, idx, ev: React.MouseEvent<HTMLElement>) => {
      // the evicted record's digest is empty string
      if (!rec.digest) {
        return
      }
      const qs = DetailPage.buildQuery({
        digest: rec.digest,
        schema: rec.schema_name,
        beginTime: controller.data!.timeRange[0],
        endTime: controller.data!.timeRange[1],
      })
      openLink(`/statement/detail?${qs}`, ev, navigate)
    }
  )

  return (
    <div>
      <AnimatedSkeleton showSkeleton={isLoading} />
      <Card noMarginBottom>
        <AutoRefreshButton
          disabled={isLoading}
          onRefresh={async () => {
            client.getInstance().deadlockListGet()
            setItems(data!)
          }}
        />
      </Card>
      {data && data.length > 0 && (
        <CardTable
          loading={false}
          columns={[
            { name: 'id', key: 'id', minWidth: 300, onRender: (it) => it.id },
            {
              name: 'sql',
              key: 'sql',
              minWidth: 500,
              onRender: (it) => <HighlightSQL sql={it.sql} compact />,
            },
            {
              name: 'key',
              key: 'key',
              minWidth: 400,
              onRender: (it) => it.key,
            },
          ]}
          items={data}
          orderBy={'id'}
          desc={false}
          data-e2e="detail_tabs_deadlock"
        />
      )}
    </div>
  )
}

export default DeadlocksTable
