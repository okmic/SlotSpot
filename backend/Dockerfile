FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm i

COPY . .

EXPOSE 9999

CMD sh -c "npx drizzle-kit generate --config drizzle.config.ts && npm run migrate && npm run server:dev"