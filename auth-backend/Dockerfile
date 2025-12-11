# Use Node.js LTS base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including dev, because tsc needs types)
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Build TypeScript into dist/
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start command: run the compiled JS
CMD ["node", "dist/server.js"]
