import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api' // ajuste pra URL real do backend
})

export async function listarFuncionarios() {
  const response = await api.get('/funcionarios')
  return response.data
}

export async function cadastrarFuncionario(funcionario) {
  const response = await api.post('/funcionarios', funcionario)
  return response.data
}