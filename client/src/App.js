import React from 'react'
import { Container, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
import ContextProvider from './Context/ContextProvider'
import theme from './theme'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Container maxWidth='xl' style={{ paddingBottom: 40 }}>
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
    </ThemeProvider>
  )
}

export default App
