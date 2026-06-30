import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/clientes'
})

export async function listarClientes() {
  try{
    const response = await fetch (api);

    if (!response.ok) {
      throw new Error('Erro ao buscar clientes no servidor.');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
}

export async function cadastrarCliente(dadosFormulario) {
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosFormulario),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar cliente no servidor.');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    throw error;
  }
}