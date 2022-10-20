FROM node:lts

ENV PORT="3000"
ENV NEXT_PUBLIC_BASE_URL_API=$NEXT_PUBLIC_BASE_URL_API
EXPOSE 3000

WORKDIR /app

COPY . .

RUN ["npm", "install"]
RUN ["node", "build-utils/createEnvFile.js"]
RUN ["npm", "run", "build"]


ENTRYPOINT [ "npm","start" ]