FROM nginx

RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/share/react

COPY package*.json ./
COPY tsconfig*.json ./

COPY . .

RUN npm install

RUN npm run build

RUN rm -rf /usr/share/nginx/html/*

RUN mkdir -p /usr/share/nginx/html

RUN cp -a dist/. /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
