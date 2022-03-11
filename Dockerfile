FROM node:17.6.0-bullseye-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@latest --silent
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]