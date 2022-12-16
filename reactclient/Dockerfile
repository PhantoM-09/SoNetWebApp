FROM node:18.12.1-alpine
WORKDIR /reactclient
ENV PATH /reactclient/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --force
COPY . ./
CMD ["npm", "start"]