import React from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import ContextProvider from './Context/ContextProvider'


function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Container maxwidth='xl'>
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Navigate to='/posts' />} />
            <Route path='/posts' exact element={<Home />} />
            <Route path='/posts/search' exact element={<Home />} />
            <Route path='/posts/:id' exact element={<PostDetails />} />
            <Route path='/auth' exact element={<Auth />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
