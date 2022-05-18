FROM node:17.9.0-buster-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@latest --silent
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]