# Use an official node image as the base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Install dependencies
RUN yarn add -g @nestjs/cli \
    @mikro-orm/cli \
    @mikro-orm/mysql

# Serve the app
CMD ["sh", "-c", "yarn install && yarn build && yarn run start:dev"]