FROM node:17.0.0-buster-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@7.7.6 --silent
COPY . .
EXPOSE 8080
CMD ["yarn", "serve"]