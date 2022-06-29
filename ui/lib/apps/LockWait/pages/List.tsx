import client, { DeadlockModel } from '@lib/client'
import {
  AnimatedSkeleton,
  AutoRefreshButton,
  Card,
  CardTable,
  HighlightSQL,
} from '@lib/components'
import openLink from '@lib/utils/openLink'
import { useMemoizedFn } from 'ahooks'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'
import { DEFAULT_CHART_SETTINGS, timeTickFormatter } from '@lib/utils/charts'
import { LockWaitChart, LockWaitTable } from '../components'

function List() {
  return (
    <Card>
      <LockWaitChart />
      <LockWaitTable />
    </Card>
  )
}

export default List
