#define o sistema base
FROM node:18-alpine
#a pasta onde o codigo vai ficar no container
WORKDIR /app
#copia o json pra dentro do container
COPY package*.json ./
#instala as coisas pro backend
RUN npm install
#copia o codigo do cakend pra dentro do container
COPY . .
#expoe a port 3000 pra deixar a comunicao do server com o navegador
EXPOSE 3000
#é oq vai rodar pra iniciar o backend (vai rodar o start do json q vai iniciar o backend)
CMD ["node", "index.js"]