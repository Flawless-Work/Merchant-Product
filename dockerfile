FROM node:carbon

WORKDIR /user/rowan/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

//yes
CMD [ "npm", "start" ]
