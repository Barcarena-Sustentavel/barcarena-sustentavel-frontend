#FROM node:18-alpine AS build
#FROM node:20-alpine AS build
#WORKDIR /app
#
#COPY package*.json ./
#COPY tsconfig*.json ./
#COPY . .
#
#RUN npm install
#RUN npm run build
#RUN apk add --no-cache tzdata
#
## Stage 2: Serve with Nginx
#FROM nginx:stable-alpine
#
## Copy custom nginx config
#COPY nginx.conf /etc/nginx/nginx.conf
#
## Remove default HTML files and add built frontend
#RUN rm -rf /usr/share/nginx/html/*
#COPY --from=build /app/dist /usr/share/nginx/html
#COPY src/assets/images/icons/LogoNoLabel.png /usr/share/nginx/html/
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# Etapa única: apenas servir os arquivos prontos com Nginx
FROM nginx:stable-alpine

# Copia a configuração personalizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

# Remove arquivos padrão do Nginx (opcional)
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos já buildados da pasta local `dist`
COPY dist/ /usr/share/nginx/html/

# (Opcional) Copia imagem se não estiver dentro do dist
COPY src/assets/images/icons/LogoNoLabel.png /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]