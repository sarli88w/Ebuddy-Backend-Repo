FROM node:alpine

# Install curl and other dependencies
RUN apk add --no-cache curl openssl

WORKDIR /home/node/app
COPY --chown=node:node ./package*.json ./tsconfig.json ./.sequelizerc ./
COPY --chown=node:node ./src/* ./src/

RUN npm install

# Allow Node debugging port to be exposed
ENV APP_PORT=5000
EXPOSE $APP_PORT

# Server development
CMD npm run dev
    