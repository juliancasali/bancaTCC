# Etapa de build
FROM node:20.17.0 AS builder
WORKDIR /app

# Copiar somente o que é necessário para instalar dependências
COPY package*.json ./
COPY .env.production .env
RUN npm ci

# Copiar o restante do projeto e gerar o build
COPY . .
RUN npm run build

# Etapa de produção com Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf