import React from 'react'
import {
  Axis,
  BarSeries,
  Chart,
  Position,
  ScaleType,
  Settings,
} from '@elastic/charts'

const data = [
  { x: 0, y: 2, g: 'txn19382810-txn19382239' },
  { x: 1, y: 7, g: 'txn19382810-txn19382239' },
  { x: 2, y: 3, g: 'txn19382810-txn19382239' },
  { x: 3, y: 6, g: 'txn19382810-txn19382239' },

  { x: 0, y: 4, g: 'txn19382912-txn19383349' },
  { x: 1, y: 5, g: 'txn19382912-txn19383349' },
  { x: 2, y: 8, g: 'txn19382912-txn19383349' },
  { x: 3, y: 2, g: 'txn19382912-txn19383349' },
]

function LockWaitChart() {
  return (
    <Chart size={[500, 200]}>
      <Axis
        id="bottom"
        position={Position.Bottom}
        title="时间"
        showOverlappingTicks
      />
      <Axis
        id="left2"
        title="冲突次数"
        position={Position.Left}
        tickFormat={(d: any) => Number(d).toFixed(2)}
      />
      <BarSeries
        id="bars"
        xScaleType={ScaleType.Linear}
        yScaleType={ScaleType.Linear}
        xAccessor="x"
        yAccessors={['y']}
        stackAccessors={['x']}
        splitSeriesAccessors={['g']}
        data={data}
      />
    </Chart>
  )
}
export default LockWaitChart
