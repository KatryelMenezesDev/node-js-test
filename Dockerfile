# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Define as variáveis de ambiente padrão
ENV NODE_ENV=local
ENV API_PORT=3000

ENV DB_HOST=mysql
ENV DB_PORT=3306
ENV DB_USER=app_user
ENV DB_PASS=app_password
ENV DB_NAME=node_js_test

ENV REDIS_HOST=redis
ENV REDIS_PORT=6379
ENV REDIS_PASSWORD=

ENV JWT_PASS=liguelead

# Comando para iniciar a aplicação
CMD ["npm", "start"]
