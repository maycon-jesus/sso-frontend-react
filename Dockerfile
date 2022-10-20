FROM node:lts

ENV PORT="3000"
EXPOSE 3000

WORKDIR /app

COPY . .

RUN ["npm", "install"]
RUN ["node", "build-utils/createEnvFile.js"]
RUN ["npm", "run", "build"]


ENTRYPOINT [ "npm","start" ]