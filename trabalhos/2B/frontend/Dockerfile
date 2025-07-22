#usa nginx como base que é um servidor web leve (o nginx pega e mostra o arquivo index.html)
FROM nginx:alpine
#copia o index.html para a pasta na pasta que o Nginx usa (desse jeito quando acessa o navegador o nginx mostra o index.html)
COPY index.html /usr/share/nginx/html/index.html
#expõe a porta 80 para acessar o site no navegador
EXPOSE 80