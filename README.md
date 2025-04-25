# Task Manager API – Node.js + Supabase (Projeto de Estudo)

Este repositório é um **projeto de estudo** que demonstra, passo a passo, a evolução de uma API backend em Node.js utilizando Supabase como backend de dados. Cada commit representa uma etapa importante do aprendizado, mostrando como a aplicação foi construída e aprimorada progressivamente, seguindo boas práticas e padrões de mercado.

## Objetivo

O objetivo deste projeto é **documentar o processo de aprendizado** no desenvolvimento de backends Node.js modernos, evidenciando decisões arquiteturais, refatorações e melhorias contínuas.

---

## Etapas do Projeto

### 1. Commit Inicial

> **Descrição:**  
> Implementação básica e funcional de um backend Node.js, utilizando Supabase para autenticação e persistência de dados.  
> **Destaque:**  
> Primeira versão mínima viável da API.

---

### 2. Segundo Commit – Testes e Arquitetura MVC

> **Descrição:**  
> Introdução de testes automatizados e reestruturação do projeto para o padrão MVC (Model-View-Controller), separando responsabilidades e melhorando a organização do código.

---

### 3. Terceiro Commit – Tratamento de Erros Customizados

> **Descrição:**  
> Adição de classes de erro customizadas e middleware global para tratamento centralizado de erros, tornando a API mais robusta e padronizada.

---

### 4. Quarto Commit – Service Layer

> **Descrição:**  
> Implementação de uma camada de serviços dedicada, isolando regras de negócio e facilitando a manutenção e testes do código.

---

### 5. Quinto Commit – Migração para TypeScript

> **Descrição:**  
> Migração completa do código de JavaScript para TypeScript, trazendo tipagem estática, maior segurança e melhor experiência de desenvolvimento.

---

### 6. Sexto Commit – Remoção dos Arquivos JavaScript

> **Descrição:**  
> Limpeza do repositório, removendo todos os arquivos `.js` restantes, mantendo apenas a base em TypeScript.

---

### 7. Sétimo Commit – Documentação Swagger

> **Descrição:**  
> Adição da documentação interativa da API utilizando Swagger (OpenAPI), facilitando o entendimento e o uso dos endpoints.

---

## Observações

- **Este projeto não é destinado a produção.**
- O foco está no aprendizado, evolução e boas práticas de desenvolvimento backend com Node.js.
- Cada commit pode ser consultado individualmente para acompanhar a evolução do código e das decisões técnicas.

---

## Como rodar o projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure as variáveis de ambiente (`.env`).
3. Compile o TypeScript:
   ```
   npm run build
   ```
4. Inicie o servidor:
   ```
   npm start
   ```
5. Acesse a documentação Swagger em:  
   [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

---

## Licença

Projeto de estudo – sem garantia de uso em produção.
