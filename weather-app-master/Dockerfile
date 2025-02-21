FROM node


WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install 

RUN npm run build 

CMD [ "npm" ,"run", "start","--","-p","3000" ]

EXPOSE 3000