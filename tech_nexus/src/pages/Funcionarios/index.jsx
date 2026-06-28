import { useState, useEffect } from 'react'
import { listarFuncionarios, cadastrarFuncionario } from '../../service/funcionariosService'
import './style.css'

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: ''
  })
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  async function carregarFuncionarios() {
    try {
      const dados = await listarFuncionarios()
      setFuncionarios(dados)
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error)
    } finally {
      setCarregando(false)
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.nome || !form.telefone || !form.email || !form.cargo || !form.setor) {
      alert('Preencha todos os campos.')
      return
    }

    setEnviando(true)
    try {
      const novoFuncionario = await cadastrarFuncionario(form)
      setFuncionarios([...funcionarios, novoFuncionario])
      setForm({ nome: '', telefone: '', email: '', cargo: '', setor: '' })
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error)
      alert('Não foi possível cadastrar. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='funcionarios'>
      <section className='funcionarios-intro'>
        <h2>Cadastro de Funcionários</h2>
        <p>
          Você está em um ambiente de registro de novos Colaboradores da
          TechNexus Solutions. Manter os dados atualizados é essencial para
          a gestão eficiente da equipe.
        </p>
      </section>

      <section className='funcionarios-form'>
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
            <label htmlFor='cargo'>Cargo</label>
            <input
              type='text'
              id='cargo'
              name='cargo'
              value={form.cargo}
              onChange={handleChange}
              placeholder='Ex: Analista, Gerente...'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='setor'>Setor</label>
            <input
              type='text'
              id='setor'
              name='setor'
              value={form.setor}
              onChange={handleChange}
              placeholder='Ex: Financeiro, TI, RH...'
            />
          </div>

          <button type='submit' disabled={enviando}>
            {enviando ? 'Cadastrando...' : 'Cadastrar Funcionário'}
          </button>
        </form>
      </section>

      <section className='funcionarios-lista'>
        <h3>Funcionários Cadastrados</h3>

        {carregando ? (
          <p className='lista-vazia'>Carregando funcionários...</p>
        ) : funcionarios.length === 0 ? (
          <p className='lista-vazia'>Nenhum funcionário cadastrado ainda.</p>
        ) : (
          <ul>
            {funcionarios.map((funcionario) => (
              <li key={funcionario.id}>
                <span className='funcionario-nome'>{funcionario.nome}</span>
                <span>{funcionario.telefone}</span>
                <span>{funcionario.email}</span>
                <span>{funcionario.cargo}</span>
                <span>{funcionario.setor}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}