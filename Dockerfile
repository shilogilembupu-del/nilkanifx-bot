FROM ghcr.io/puppeteer/puppeteer:21.5.0

# Switch to root to install dependencies
USER root

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Set environment variable inside Docker
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Command to start the bot
CMD ["node", "index.js"]
