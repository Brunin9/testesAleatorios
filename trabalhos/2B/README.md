# Registro de Horários - Projeto com Docker Compose

## Descrição
Sistema simples onde o usuário digita um título e registra a data/hora atual em um banco de dados.

## Tecnologias
- Frontend: HTML/CSS/JS puro
- Backend: Node.js + Express
- Banco de dados: MySQL
- Adminer para visualizar os dados
- Docker Compose para orquestrar

## Como executar

1. Copie o arquivo de ambiente:
```
cp .env.template .env
```

2. Suba os containers:
```
docker-compose up --build
```

3. Acesse:
- Frontend: http://localhost
- Backend (API): http://localhost:3000
- Adminer: http://localhost:8081

Use as credenciais do `.env` para acessar o Adminer.

## Estrutura

- Cada serviço tem seu próprio Dockerfile
- Persistência dos dados com volumes
- Comunicação via rede Docker personalizada
