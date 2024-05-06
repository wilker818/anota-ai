FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY  . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf./default.conf

COPY --from=build /app/dist/anota-ai/browser /usr/share/nginx/html


EXPOSE 80
