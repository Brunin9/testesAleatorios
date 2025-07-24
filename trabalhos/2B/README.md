# Registro de Horários 

## Descrição

É um sistema onde o usuário preenche um **título** e um **horário**, e esses dados são registrados em um banco de dados. O projeto inclui a criação de um ambiente com vários containers usando **Docker Compose**, integrando frontend, backend e banco de dados.

## Visão Geral

- **Frontend:** HTML + JavaScript (consome a API)
- **Backend:** Node.js com Express
- **Banco de Dados:** MySQL
- **Interface para o Banco:** Adminer
- **Orquestração dos containers:** Docker Compose

---

## Como executar o projeto

### 1- Clone o repositório
```bash
git clone https://github.com/Brunin9/testesAleatorios.git
cd testesAleatorios
```
### 2- Configure as variáveis de ambiente

Copie o modelo de arquivo ".env" com o comando:
```bash
cp .env.template .env
```
Se quiser alterar usúario, senha ou nome do banco edite no arquivo ".env"

### 3- Inicie os containers com o Docker Compose
```bash
docker-compose up --build
```
---
## Como Visualizar no navegador
- Frontend: http://localhost:8080
- Backend (API): http://localhost:3000/registros
- Adminer: http://localhost:8081 
- obs: os dados padrão para o adminer estão no ".env"


## Como funciona cada parte

### Frontend(HTML): 
- página onde o usuário digita um título e um horário. Essa página envia as informações para o backend.

- Está em seu próprio container **frontend**
## Backend (Express): 
- Recebe requisições do Frontend, processa os dados e armazena no banco de dados MySQL.

- Está em um contêiner separado **backend**

### MySQL(Banco de Dados): 
- Serviço de banco de dados relacional que armazena os registros de horário.

- Está em seu próprio contêiner **db**, com persistência de dados utilizando volume Docker.

### ADMINER:
- Ferramenta de administração de banco de dados.

- Funciona no container **adminer**

### POST:
- O usuário envia novos dados (título e horário) para o Backend.

### DOCKER NETWORK:
 - Todos os serviços: frontend, backend, banco de dados, adminer estão em containers e se comunicam por meio de uma rede interna chamada **rede**



  

## Arquitetura do Projeto
![Arquitetura do sistema](imgs/arquitetura.png)

## Resumo do fluxo
- O usuário usa o Frontend para colocar título e horário e registrar os dados

- O Frontend envia os dados com um POST para o Backend

- O Backend salva os dados no MySQL

- O MySQL responde

- O Backend confirma para o Frontend

- O Adminer pode ser usado para visualizar os registros direto no banco



