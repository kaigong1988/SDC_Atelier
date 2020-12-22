FROM node:13.10.1
RUN mkdir /app
ADD . /app
WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]