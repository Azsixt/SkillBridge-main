# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript (if needed)
# RUN npm run build

# Expose port
EXPOSE 4000

# Start the application
CMD ["npx", "ts-node", "src/index.ts"] 