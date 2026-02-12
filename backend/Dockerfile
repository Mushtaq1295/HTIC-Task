# Use official Node image
FROM node:22.12

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend code
COPY . .

# Expose backend port
EXPOSE 5002

# Start server
CMD ["npm", "start"]