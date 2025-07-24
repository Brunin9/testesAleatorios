#usa a imagem do Node.js
FROM node:14

#define o diretório onde os comandos de baixo vão rodar
WORKDIR /usr/src/app

#copia o arquivo de package.json (é um arquivo de configuracao q é onde ficam as instruções pra funcionar)
COPY package*.json ./

#instala as dependências (oq ta no json)
RUN npm install

#copia os arquivos da pasta pra dentro do container
COPY . .

#expõe a porta que o site vai rodar(é onde o backend vai receber oq deve fazer)
EXPOSE 3000

#comando para iniciar o container (roda o index.js com node)
CMD ["npm", "start"]