#FROM nginx

#RUN apt-get update && apt-get install -y \
#    curl \
#    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
#    && apt-get install -y nodejs \
#    && apt-get clean \
#    && rm -rf /var/lib/apt/lists/*
#WORKDIR /usr/share/react

#COPY package*.json ./
#COPY tsconfig*.json ./

#COPY . .

#RUN npm install

#RUN npm run build

#RUN rm /etc/nginx/nginx.conf

#RUN rm -rf /usr/share/nginx/html/*
#
#RUN mkdir -p /usr/share/nginx/html
#
#RUN cp -a dist/. /usr/share/nginx/html
#
#COPY nginx.conf /etc/nginx/nginx.conf

#RUN cp nginx.conf /etc/nginx/nginx.conf 

#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# Stage 1: Build React app with Node.js
#FROM node:18-alpine AS build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY . .

RUN npm install
RUN npm run build
RUN apk add --no-cache tzdata

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default HTML files and add built frontend
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

