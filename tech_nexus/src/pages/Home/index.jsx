import { Link } from 'react-router-dom'
import './style.css'

export default function Home() {
  return (
    <div className='home'>
      <section className='home-intro'>
        <h2>TechNexus Solutions</h2>
        <p>
          A TechNexus Solutions é uma empresa focada em conectar e gerenciar
          parceiros e colaboradores de forma simples e eficiente. Nosso sistema
          de gestão interna permite o controle completo de clientes e
          funcionários em um só lugar.
        </p>
      </section>

      <section className='home-options'>
        <Link to='/clientes' className='home-card'>
          <h3>Clientes</h3>
          <p>Gerencie o cadastro de parceiros e clientes da empresa.</p>
        </Link>

        <Link to='/funcionarios' className='home-card'>
          <h3>Funcionários</h3>
          <p>Gerencie o cadastro de colaboradores da empresa.</p>
        </Link>
      </section>
    </div>
  )
}