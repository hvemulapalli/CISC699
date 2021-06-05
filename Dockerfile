FROM node:14-alpine

RUN addgroup mygroup && adduser -D -G mygroup myuser && mkdir -p /usr/src/app && chown -R myuser /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN chown myuser /usr/src/app/package-lock.json

USER myuser

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# Start the app
CMD ["/usr/local/bin/npm", "start"]
