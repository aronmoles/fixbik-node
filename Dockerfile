FROM node:14-alpine as node-build
WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile && \
    yarn build


FROM node:14-alpine
LABEL maintainer=aron.moles@gmail.com
WORKDIR /usr/src/app

# Bundle app source
COPY --from=node-build /usr/src/app/build .
COPY --from=node-build /usr/src/app/migration migration

RUN yarn install --frozen-lockfile --prod

# VOLUMES
#VOLUME /usr/src/app/uploads

# EXPOSE
EXPOSE 3000

# COMMAND
CMD ["node", "/usr/src/app/src/app/start.js"]
