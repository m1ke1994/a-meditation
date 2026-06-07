FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci \
    && npm install --no-save @rollup/rollup-linux-x64-musl

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
