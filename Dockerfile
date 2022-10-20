FROM node:lts

ENV PORT="3000"
EXPOSE 3000

WORKDIR /app

COPY . .

RUN ["npm", "install"]
RUN ["npm", "run", "build"]


ENTRYPOINT [ "node",".next/standalone/server.js" ]