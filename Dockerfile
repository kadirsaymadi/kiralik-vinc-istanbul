FROM node:18-alpine

# Güvenlik için non-root user oluştur
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

# Package dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Uygulama dosyalarını kopyala
COPY --chown=nextjs:nodejs . .

# Port'u 2021 olarak expose et
EXPOSE 2021

# Non-root user ile çalıştır
USER nextjs

# Health check ekle
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:2021', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["npm", "start"]
