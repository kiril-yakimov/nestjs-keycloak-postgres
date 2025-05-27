FROM node:lts-alpine AS builder

WORKDIR /usr/src/

# Set HUSKY=0 as an ENV variable
ENV HUSKY=0

COPY .yarn ./.yarn

COPY package.json yarn.lock .yarnrc.yml ./

# Install dependencies
RUN yarn workspaces focus

COPY . .
COPY ./migrations ./src/migrations

RUN yarn build

FROM node:lts-slim

WORKDIR /app

COPY --from=builder /usr/src/dist /app/
COPY --from=builder /usr/src/node_modules /app/node_modules
COPY --from=builder /usr/src/tsconfig.json /app
COPY --from=builder /usr/src/.yarn /app/.yarn
COPY --from=builder /usr/src/.yarnrc.yml /app
COPY --from=builder /usr/src/yarn.lock /app

EXPOSE 3000
CMD ["yarn", "start:prod"]
