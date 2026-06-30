🚀 Desafio Técnico ERP Nexus - [Senai]

Atividade Prática: Sistema de Gestão Interna (ERP Nexus) - Consiste no desenvolvimento do MVP de um sistema de gestão para centralizar o controle de parceiros e colaboradores da TechNexus Solutions, contando com uma API REST robusta e uma interface Single Page Application (SPA).

👥 Desenvolvedores

[Brunno Rosa]
[Geovane Ferreira]

🛠️ Tecnologias Utilizadas

* Java 17 / Spring Boot 3.x
* Spring Data JPA / Spring Web
* Docker e H2 (Ambiente de Banco de Dados)
* ReactJS / Vite
* Axios
* [CSS Modules / Tailwind CSS]

🚀 Como Executar o Projeto

1. Clonar e preparar o ambiente:
   Clone o repositório: git clone https://github.com/BrunnoRosa/ativ_tech_nexus.git
   Entre na pasta do projeto: cd ativ_tech_nexus

2. Executar o Back-end & Banco de Dados:
   Inicie o banco de dados no Docker: docker-compose up -d
   Entre na pasta do back-end: cd backend
   Instale as dependências e compile: ./mvnw clean install
   Inicie a API Spring Boot: ./mvnw spring-boot:run

3. Executar o Front-end:
   Abra um novo terminal e entre na pasta do front-end: cd frontend
   Instale as dependências: npm install
   Instale as dependências: npm install react-router-dom
   Instale as dependências: npm install axios react-toastify
   Inicie o servidor de desenvolvimento: npm run dev
