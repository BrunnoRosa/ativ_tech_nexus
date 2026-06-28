import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export async function listarClientes() {
  const response = await api.get('/clientes')
  return response.data
}

export async function cadastrarCliente(cliente) {
  const response = await api.post('/clientes', cliente)
  return response.data
}