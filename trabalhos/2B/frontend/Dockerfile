# usa nginx como base que é um servidor web leve
FROM nginx:alpine
# copia o index.html para a pasta padrão onde o nginx serve arquivos
COPY index.html /usr/share/nginx/html/index.html
# expõe a porta 80 para acessar o site no navegador
EXPOSE 80