import { CardTable } from '@lib/components'
import openLink from '@lib/utils/openLink'
import { useMemoizedFn } from 'ahooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const data = [
  { txn_locking: 19382810, txn_locked: 19382239 },
  { txn_locking: 19382812, txn_locked: 19382249 },
]

function LockWaitTable() {
  const navigate = useNavigate()
  const handleRowClick = useMemoizedFn(
    (id, ev: React.MouseEvent<HTMLElement>) => {
      openLink(`/lockwait/detail?id=${id}`, ev, navigate)
    }
  )
  return (
    <CardTable
      columns={[
        {
          name: 'txn locking',
          key: 'txn_locking',
          minWidth: 100,
          onRender: (it) => (
            <a onClick={(e) => handleRowClick(it.txn_locking, e)}>
              {it.txn_locking}
            </a>
          ),
        },
        {
          name: 'txn locked',
          key: 'txn locked',
          minWidth: 300,
          onRender: (it) => (
            <a onClick={(e) => handleRowClick(it.txn_locked, e)}>
              {it.txn_locked}
            </a>
          ),
        },
      ]}
      items={data}
      orderBy={'txn_locking'}
      desc={false}
      data-e2e="lockwait_list"
    />
  )
}

export default LockWaitTable
