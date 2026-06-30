import './style.css'

export default function Footer(){
    return(
    <footer className='footer'>
        <p>
            &copy; {new Date().getFullYear()} - Todos os direitos reservados.
            <br />
            SENAI - Bahia
            <br />
            Desenvolvido por Bruno Rosa e Geovane Ferreira
        </p>

    </footer>
    )
}