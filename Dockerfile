FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
# Start the app
CMD ["/usr/local/bin/npm", "start"]
