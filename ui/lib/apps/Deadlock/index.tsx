import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Root } from '@lib/components'
import { List, Detail } from './pages'
export default function () {
  return (
    <Root>
      <Router>
        <Routes>
          <Route path="/deadlock" element={<List />} />
          <Route path="/deadlock/detail/:deadlock_id" element={<Detail />} />
        </Routes>
      </Router>
    </Root>
  )
}
