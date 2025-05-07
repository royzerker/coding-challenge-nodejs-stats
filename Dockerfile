FROM node:23-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn global add typescript

RUN yarn tsc

EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
