import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Root } from '@lib/components'
import { DeadlocksTable } from './components'
export default function () {
  return (
    <Root>
      <Router>
        <Routes>
          <Route path="/deadlock" element={<DeadlocksTable />} />
        </Routes>
      </Router>
    </Root>
  )
}
