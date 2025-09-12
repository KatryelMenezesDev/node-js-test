# Node.js Test API

API Backend desenvolvida em Node.js com TypeScript, Express, Sequelize e MySQL.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Docker e Docker Compose (opcional, mas recomendado)
- MySQL 8.0
- Redis

## 🚀 Como executar localmente

### Opção 1: Usando Docker Compose (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/KatryelMenezesDev/node-js-test.git
cd node-js-test
```

2. Execute o Docker Compose:
```bash
docker-compose up -d
```

Isso irá subir:
- MySQL na porta 3306
- Redis na porta 6379
- phpMyAdmin na porta 8080
- A API na porta 3000

### Opção 2: Execução manual

1. Clone o repositório:
```bash
git clone https://github.com/KatryelMenezesDev/node-js-test.git
cd node-js-test
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp env.example .env
```

4. Configure o banco de dados MySQL e Redis conforme as variáveis de ambiente

5. Execute em modo de desenvolvimento:
```bash
npm run dev
```

6. Para produção, compile e execute:
```bash
npm run build
npm start
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações da API
NODE_ENV=local
API_PORT=3000

# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=app_user
DB_PASS=app_password
DB_NAME=node_js_test

# Configurações do Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Configurações de JWT
JWT_PASS=liguelead
```

### Descrição das Variáveis:

- **NODE_ENV**: Ambiente de execução (`local`, `development`, `production`)
- **API_PORT**: Porta onde a API será executada (padrão: 3000)
- **DB_HOST**: Host do banco MySQL
- **DB_PORT**: Porta do banco MySQL (padrão: 3306)
- **DB_USER**: Usuário do banco MySQL
- **DB_PASS**: Senha do banco MySQL
- **DB_NAME**: Nome do banco de dados
- **REDIS_HOST**: Host do Redis
- **REDIS_PORT**: Porta do Redis (padrão: 6379)
- **REDIS_PASSWORD**: Senha do Redis (opcional)
- **JWT_PASS**: Chave secreta para assinatura dos tokens JWT

## 📚 Documentação da API

A API possui documentação interativa via Swagger disponível em:
- **URL**: http://localhost:3000/api-docs
- **JSON**: http://localhost:3000/swagger.json

## 🛠️ Scripts Disponíveis

- `npm run dev`: Executa a aplicação em modo de desenvolvimento com hot reload
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa a aplicação em modo de produção
- `npm run lint`: Executa o linter para verificar a qualidade do código

## 🏗️ Estrutura do Projeto

```
src/
├── config/                 # Configurações da aplicação
├── modules/               # Módulos da aplicação
│   ├── users/            # Módulo de usuários
│   ├── tasks/            # Módulo de tarefas
│   └── projects/         # Módulo de projetos
├── shared/               # Código compartilhado
│   ├── container/        # Injeção de dependências
│   ├── infra/           # Infraestrutura (HTTP, banco)
│   ├── providers/       # Provedores (Cache, Hash, Token)
│   └── repositories/    # Repositórios base
└── utils/               # Utilitários
```

## 🔌 Endpoints Principais

### Usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Buscar usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário
- `POST /users/auth` - Autenticar usuário

### Tarefas
- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/project/:projectId` - Buscar tarefas por projeto
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

### Projetos
- `POST /projects` - Criar projeto
- `GET /projects` - Listar todos os projetos
- `GET /projects/:id` - Buscar projeto por ID
- `PUT /projects/:id` - Atualizar projeto
- `DELETE /projects/:id` - Deletar projeto
- `POST /projects/:id/link-github` - Vincular repositório GitHub

## 🐳 Docker

### Build da imagem:
```bash
docker build -t node-js-test-api .
```

### Executar container:
```bash
docker run -p 3000:3000 node-js-test-api
```

## 🗄️ Banco de Dados

### Acesso via phpMyAdmin (Docker):
- **URL**: http://localhost:8080
- **Usuário**: root
- **Senha**: root123

### Acesso direto MySQL:
- **Host**: localhost:3306
- **Usuário**: app_user
- **Senha**: app_password
- **Database**: node_js_test

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```
Authorization: Bearer <seu_token_jwt>
```