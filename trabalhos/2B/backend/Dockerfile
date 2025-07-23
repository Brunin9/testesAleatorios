FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copia o script de espera
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

# Espera o banco antes de iniciar
CMD ["/wait-for-it.sh", "db:3306", "--", "node", "index.js"]