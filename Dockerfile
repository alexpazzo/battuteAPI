FROM node:9-alpine

# Install pm2
RUN npm install pm2 -g

# Install pm2-logrotate
RUN pm2 install pm2-logrotate && \
    pm2 set pm2-logrotate:max_size 10M && \
    pm2 set pm2-logrotate:compress true && \
    pm2 set pm2-logrotate:rotateInterval '0 0 * * * *'

### Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

### Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

### Copy application source
COPY . .
