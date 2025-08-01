FROM node:20-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the app, including ecosystem.config.js and entrypoint.sh
COPY . .


COPY ecosystem.config.js ./ecosystem.config.js

# Make the entrypoint script executable
COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY deploy/deploy.sh /deploy.sh
RUN chmod +x /deploy.sh

# Use entrypoint script to handle secrets, setup, etc.
ENTRYPOINT ["/entrypoint.sh"]

# Run app using PM2 in production mode
CMD ["pm2-runtime", "ecosystem.config.js"]