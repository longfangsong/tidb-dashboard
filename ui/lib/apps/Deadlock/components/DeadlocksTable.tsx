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

function DeadlocksTable() {
  const { data, isLoading, error } = useClientRequest((reqConfig) => {
    console.log('reqConfig', reqConfig)
    return client.getInstance().deadlockListGet(reqConfig)
  })
  let [items, setItems] = useState(data ?? [])
  return (
    <div>
      <AnimatedSkeleton showSkeleton={isLoading} />
      <Card noMarginBottom>
        <AutoRefreshButton
          disabled={isLoading}
          onRefresh={async () => {
            const { data } = await client.getInstance().deadlockListGet()
            setItems(data)
          }}
        />
      </Card>
      {data && data.length > 0 && (
        <CardTable
          loading={false}
          columns={[
            { name: 'id', key: 'id', minWidth: 300, onRender: (it) => it.id },
            {
              name: 'SQL',
              key: 'sql',
              minWidth: 500,
              onRender: (it) => <HighlightSQL sql={it.sql} compact />,
            },
            {
              name: 'locked key',
              key: 'locked_key',
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
