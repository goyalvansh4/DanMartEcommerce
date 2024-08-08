// src/App.jsx
import './App.css'
import Header from './USER/components/Header'
import Footer from './USER/components/Footer'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
