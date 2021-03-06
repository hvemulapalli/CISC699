FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

#RUN chmod -R 777 /usr/src/app/

EXPOSE 3000
# Start the app
ENTRYPOINT ["/usr/local/bin/npm", "start"]
