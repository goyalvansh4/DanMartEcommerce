// src/App.jsx
import './App.css'
import Header from './USER/components/Header'
import Footer from './USER/components/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from './USER/components/NavBar/NavBar'


function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
