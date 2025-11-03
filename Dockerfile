# Etapa única: apenas servir os arquivos prontos com Nginx
FROM nginx:stable-alpine
# Copia a configuração personalizada do Nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf
# Remove arquivos padrão do Nginx (opcional)
RUN rm -rf /usr/share/nginx/html/*

#COPY  /etc/letsencrypt/live/observatoriodebarcarena.com.br /etc/letsencrypt/live
 COPY ./ssl/observatoriodebarcarena.com.br /etc/letsencrypt/live/observatoriodebarcarena.com.br


#COPY ./ssl/selfsigned.crt /etc/ssl/certs/
#COPY ./ssl/selfsigned.key /etc/ssl/private/
# Copia os arquivos estáticos já buildados da pasta local `dist`
COPY dist/ /usr/share/nginx/html/

# (Opcional) Copia imagem se não estiver dentro do dist
COPY src/assets/images/icons/LogoNoLabel.png /usr/share/nginx/html/

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
