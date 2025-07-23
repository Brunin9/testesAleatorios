# Use a imagem base do Node.js
FROM node:14

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o app vai rodar
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]