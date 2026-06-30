import { useState } from 'react'
import { listarClientes, cadastrarCliente } from '../../service/clientesService'
import './style.css'
import { toast } from 'react-toastify'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  })
  const [carregando, setCarregando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [listaVisivel, setListaVisivel] = useState(false)

  async function carregarClientes() {
    setCarregando(true)
    try {
      const dados = await listarClientes()
      setClientes(dados)
      setListaVisivel(true)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
      alert('Não foi possível carregar a lista.')
    } finally {
      setCarregando(false)
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.nome || !form.email || !form.telefone || !form.cpf) {
      toast.error('Preencha todos os campos.')
      return
    }

    setEnviando(true)
    try {
      const novoCliente = await cadastrarCliente(form)
      if (listaVisivel) {
        setClientes([...clientes, novoCliente])
      }
      setForm({ nome: '', email: '', telefone: '', cpf: '' })
      toast.success('Cliente cadastrado com sucesso!') // Adicionado para dar um feedback visual
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error)
      toast.error('Não foi possível cadastrar. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='clientes'>
      <section className='clientes-intro'>
        <h2>Cadastro de Clientes</h2>
        <p>
          Você está em um ambiente de registro de novos Clientes e Parceiros
          da TechNexus Solutions. Seu cadastro é importante para a empresa,
          pois garante um relacionamento mais próximo e eficiente com cada
          parceiro.
        </p>
      </section>

      <section className='clientes-form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='nome'>Nome</label>
            <input
              type='text'
              id='nome'
              name='nome'
              value={form.nome}
              onChange={handleChange}
              placeholder='Digite o nome completo'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>E-mail</label>
            <input
              type='email'
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='exemplo@email.com'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='telefone'>Telefone</label>
            <input
              type='text'
              id='telefone'
              name='telefone'
              value={form.telefone}
              onChange={handleChange}
              placeholder='(00) 00000-0000'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='cpf'>CPF</label>
            <input
              type='text'
              id='cpf'
              name='cpf'
              value={form.cpf}
              onChange={handleChange}
              placeholder='000.000.000-00'
            />
          </div>

          <button type='submit' disabled={enviando}>
            {enviando ? 'Cadastrando...' : 'Cadastrar Cliente'}
          </button>
        </form>
      </section>

      <section className='clientes-lista'>
        <button
          type='button'
          className='btn-listar'
          onClick={carregarClientes}
          disabled={carregando}
        >
          {carregando ? 'Carregando...' : 'Listar Cadastro de Clientes'}
        </button>

        {listaVisivel && (
          <>
            <h3>Clientes Cadastrados</h3>

            {clientes.length === 0 ? (
              <p className='lista-vazia'>Nenhum cliente cadastrado ainda.</p>
            ) : (
              <ul>
                {clientes.map((cliente) => (
                  <li key={cliente.id}>
                    <span className='cliente-nome'>{cliente.nome}</span>
                    <span>{cliente.email}</span>
                    <span>{cliente.telefone}</span>
                    <span>{cliente.cpf}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  )
}