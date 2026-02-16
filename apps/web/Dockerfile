FROM node:20-slim

RUN apt-get update && apt-get install -y openssl default-mysql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 開発時はvolume mountで上書きされるため、実行時にも権限付与する
RUN chmod +x scripts/start.sh

EXPOSE 3000

CMD ["/app/scripts/start.sh"]
