import { CardTable, HighlightSQL } from '@lib/components'
import { useMemoizedFn } from 'ahooks'
import { Card } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-use'

function Detail() {
  const id = new URLSearchParams(useLocation().search).get('id') || 19382810

  return (
    <Card>
      <p>事务类型 {id}</p>
      <CardTable
        columns={[
          {
            name: 'sql',
            key: 'sql',
            minWidth: 100,
            onRender: (it) => <HighlightSQL sql={it} compact />,
          },
        ]}
        items={['begin;', 'select * from t for update;', 'commit;']}
      />
    </Card>
  )
}

export default Detail
