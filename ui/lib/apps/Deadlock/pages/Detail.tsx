import React, { useEffect, useRef } from 'react'
import { useClientRequest } from '@lib/utils/useClientRequest'
import client from '@lib/client'
import { graphviz } from 'd3-graphviz'
import { useParams } from 'react-router'
import { Card } from 'antd'
import { CardTable, HighlightSQL } from '@lib/components'

function Detail() {
  const { deadlock_id } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const { data, isLoading, error } = useClientRequest((reqConfig) =>
    client.getInstance().deadlockListGet(reqConfig)
  )
  useEffect(() => {
    const containerEl = containerRef.current
    if (!containerEl) {
      return
    }

    const define = data
      ?.filter((it) => it.id?.toString() == deadlock_id)
      .map((it) => it.try_lock_trx)
    const link = data
      ?.filter((it) => it.id?.toString() == deadlock_id)
      .map((it) => {
        console.log(it)
        return `${it.try_lock_trx} -> ${it.holding_lock_trx} [label="${
          JSON.parse(it.key_info!)['table_name']
        }.${JSON.parse(it.key_info!)['handle_value']}"]`
      })
      .join('')
    const dot = `digraph {
node [shape=ellipse fontsize=8 fontname="Verdana"];
${define}\n${link}\n}`
    console.log(dot)
    graphviz(containerEl).renderDot(dot)
  }, [containerRef, data])

  return (
    <Card>
      <div ref={containerRef}></div>
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
    </Card>
  )
}

export default Detail
