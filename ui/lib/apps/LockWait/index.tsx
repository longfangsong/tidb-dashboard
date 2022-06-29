import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Root } from '@lib/components'
import { List, Detail } from './pages'
export default function () {
  return (
    <Root>
      <Router>
        <Routes>
          <Route path="/lockwait" element={<List />} />
          <Route path="/lockwait/detail" element={<Detail />} />
        </Routes>
      </Router>
    </Root>
  )
}
