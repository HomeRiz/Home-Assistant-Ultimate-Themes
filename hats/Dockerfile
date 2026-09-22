# Stage 1: Build Frontend
FROM node:20-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final Add-on Image
FROM node:20-alpine

RUN apk add --no-cache bash tini

WORKDIR /app

# Copy production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend from builder stage
COPY --from=builder /build/dist ./dist

# Copy server code, translations, and bundled themes
COPY server ./server
COPY translations ./translations
COPY bundled ./bundled
COPY config.yaml ./config.yaml

# Copy run script
COPY run.sh /run.sh
RUN chmod a+x /run.sh

# Expose Ingress Port
EXPOSE 4287

ENV INGRESS_PORT=4287
ENV HA_CONFIG_DIR=/config

ENTRYPOINT ["/sbin/tini", "-s", "--"]
CMD [ "/run.sh" ]
