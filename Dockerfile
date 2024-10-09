FROM node:20.17.0-alpine3.20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN mkdir -p /app/dist && npm run build

FROM node:20.17.0-alpine3.20 as production


WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

COPY --from=build /app/nest-cli.json ./
COPY --from=build /app/tsconfig*.json ./

EXPOSE 5001

CMD ["node", "dist/main"]
