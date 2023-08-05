FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY ./ ./

# execute the app
CMD [ "npm", "run", "dev" ]
