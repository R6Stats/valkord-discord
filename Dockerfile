FROM node:12.13-alpine As base

ENV NODE_ENV=development

ENV DISCORD_TOKEN=
ENV PREFIXES=

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/src/main"]
