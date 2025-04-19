import { useState } from 'react'
import Search from './Sections/Search'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'

function App() {

  return (
    <>
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />}/>
        <Route path="/search" element={<Search />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
