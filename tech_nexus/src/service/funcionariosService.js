// URL base do seu backend Spring Boot
const API_URL = 'http://localhost:8080/api/funcionarios';

// Função para buscar todos os funcionários (GET)
export async function listarFuncionarios() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar funcionários no servidor.');
    }
    
    return await response.json(); // Retorna a lista que veio do banco
  } catch (error) {
    console.error("Erro no service (listar):", error);
    throw error; // Repassa o erro para o index.jsx tratar
  }
}

// Função para cadastrar um novo funcionário (POST)
export async function cadastrarFuncionario(dadosFormulario) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosFormulario), // Transforma o objeto do formulário em JSON
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar funcionário no servidor.');
    }

    return await response.json(); // Retorna o funcionário salvo (geralmente vindo com o ID do banco)
  } catch (error) {
    console.error("Erro no service (cadastrar):", error);
    throw error;
  }
}