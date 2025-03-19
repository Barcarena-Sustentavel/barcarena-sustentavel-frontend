FROM node:18.19.1-alpine AS build

WORKDIR /app 

COPY package*.json ./
RUN npm install 
COPY . . 
RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/build /usr/sahre/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

