import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Clientes from './pages/Clientes'
import Funcionarios from './pages/Funcionarios'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  )
}

export default App