FROM node:20 AS base
WORKDIR /src

FROM base AS builder
COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM base AS production
ENV PORT=3000
ENV NODE_ENV=production
COPY --from=builder /src/.output /src/.output
CMD [ "node", ".output/server/index.mjs" ]
