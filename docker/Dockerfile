### Base ###

FROM node:18-alpine as base

RUN apk add --no-cache g++ make py3-pip libc6-compat

WORKDIR /app

COPY package.json yarn.lock* ./

### Production ##

# FROM base as production
# WORKDIR /app

# ENV NODE_ENV=production
# RUN npm ci

# RUN npm run build

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# CMD npm start

### Dev ###

FROM base as dev

ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
