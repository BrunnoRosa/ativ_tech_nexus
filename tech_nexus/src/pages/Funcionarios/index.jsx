import { useState } from 'react'
// ORIENTAÇÃO 1: O componente depende dessas duas funções para conversar com o Spring Boot.
// O teste real vai acontecer dentro deste arquivo importado abaixo.
import { listarFuncionarios, cadastrarFuncionario } from '../../service/funcionariosService'
import './style.css'
import { toast } from 'react-toastify'

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([])
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: ''
  })
  const [carregando, setCarregando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [listaVisivel, setListaVisivel] = useState(false)

  // ORIENTAÇÃO 2: Essa função dispara quando você clica em "Listar Cadastro".
  // Ela aguarda a resposta do Spring Boot (GET) e injeta o array recebido no estado 'funcionarios'.
  async function carregarFuncionarios() {
    setCarregando(true)
    try {
      const dados = await listarFuncionarios()
      setFuncionarios(dados) // Aqui o React renderiza a lista vinda do banco de dados
      setListaVisivel(true)
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error)
      toast.error('Não foi possível carregar a lista.')
    } finally {
      setCarregando(false)
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ORIENTAÇÃO 3: Dispara no envio do formulário. 
  // Envia o objeto 'form' para o service, que por sua vez faz o POST no Spring Boot.
  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.nome || !form.telefone || !form.email || !form.cargo || !form.setor) {
      toast.error('Preencha todos os campos.')
      return
    }

    setEnviando(true)
    try {
      // O Spring Boot deve retornar o funcionário salvo (geralmente com o ID gerado pelo banco)
      const novoFuncionario = await cadastrarFuncionario(form)
      
      // Se a lista já estiver aberta na tela, adicionamos o novo elemento nela dinamicamente
      if (listaVisivel) {
        setFuncionarios([...funcionarios, novoFuncionario])
      }
      
      // Limpa os campos do formulário para o próximo cadastro
      setForm({ nome: '', telefone: '', email: '', cargo: '', setor: '' })
      toast.success('Funcionário cadastrado com sucesso!') // Adicionado para dar um feedback visual
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error)
      toast.error('Não foi possível cadastrar. Tente novamente.')
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
        <button
          type='button'
          className='btn-listar'
          onClick={carregarFuncionarios}
          disabled={carregando}
        >
          {carregando ? 'Carregando...' : 'Listar Cadastro de Funcionários'}
        </button>

        {listaVisivel && (
          <>
            <h3>Funcionários Cadastrados</h3>

            {funcionarios.length === 0 ? (
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
          </>
        )}
      </section>
    </div>
  )
}