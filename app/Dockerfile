FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Install only production dependencies (Express + better-sqlite3)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built frontend + server code
COPY --from=build /app/dist ./dist
COPY server/ ./server/

# Data volume for SQLite persistence
RUN mkdir -p /app/data
VOLUME /app/data
ENV DATA_DIR=/app/data
ENV PORT=80

EXPOSE 80
CMD ["node", "server/index.js"]
