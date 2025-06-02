FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM httpd:alpine

WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /app/dist/* /usr/local/apache2/htdocs/
RUN mv browser/* . && rm -r browser/

EXPOSE 80
CMD ["httpd-foreground"]