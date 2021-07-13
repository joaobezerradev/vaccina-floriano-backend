FROM node:lts-alpine3.11

ENV HOME=/home/node
ENV APP=${HOME}/app

RUN apk add --no-cache git \
    && apk add curl wget --update

RUN yarn config set cache-folder ${HOME}/.yarn-cache \
    && yarn global add @nestjs/cli

WORKDIR ${APP}

USER node