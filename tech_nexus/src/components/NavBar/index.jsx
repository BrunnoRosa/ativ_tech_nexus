import { Link } from 'react-router-dom'
import './style.css'

export default function NavBar(){
    return(
        <div className='navbar'>
            <h1>SISTEMA DE GESTÃO INTERNA - TECH NEXUS</h1>
            <nav>
                <Link to='/'> Início</Link>
                <Link to='/clientes'> Clientes</Link>
                <Link to='/funcionarios'> Funcionários</Link>
            </nav>
        </div>
    )
}