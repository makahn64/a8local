FROM mhart/alpine-node:12
RUN apk --no-cache add --virtual builds-deps build-base python
WORKDIR /opt/a8
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
EXPOSE 2000
ENV NODE_ENV=docker
CMD ["node","app.js"]
