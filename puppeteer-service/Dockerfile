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

# Make the entrypoint script executable
RUN chmod +x deploy/entrypoint.sh
RUN chmod +x deploy/deploy.sh

# Use entrypoint script to handle secrets, setup, etc.
ENTRYPOINT ["deploy/entrypoint.sh"]

# Run app using PM2 in production mode
CMD ["pm2-runtime", "ecosystem.config.js"]