# MeTube - Interface Web para Baixar Vídeos 

## O que é o MeTube?

O **MeTube** é um sistema para baixar vídeos e áudios de sites como **YouTube**, **TikTok** e **Facebook**. Com o MeTube é possível baixar vídeos colando o link na interface web, acessando e usando pelo navegador.

## Para que utilizá-lo?

O MeTube pode ser usado para:
- Guardar vídeos para assistir offline como por exemplo uma aula, uma entrevista ou uma palestra
- converter vídeo em áudio
- Criar uma biblioteca pessoal de conteúdo


## Pré-requisitos

- Docker instalado: [Link para instalar o Docker](https://www.docker.com/products/docker-desktop)
- Docker Compose instalado
- Porta 8080 liberada no navegador/firewall

## Como Utilizar:

### Crie um compose:
- crie um compose.yaml com as seguintes informações: 

```bash
services:
  metube:
    image: ghcr.io/alexta69/metube
    container_name: metube
    restart: unless-stopped
    ports:
      - "8080:8081"
    volumes:
      - ./downloads:/downloads
```
Depois no terminal , dentro da pasta onde criou o compose.yaml digite:
```bash
docker compose up
```

### Acesse o sistema:
No navegador acesse:
```bash
http://localhost:8080
```
1. Cole o link do vídeo que deseja baixar
2. Escolha o formato(vídeo ou somente áudio)
3. Clique em download
4. Os arquivos ficarão baixados na pasta  `downloads/`