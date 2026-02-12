# Use Node image
FROM node:22.12

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start frontend
CMD ["npm", "run", "dev", "--", "--host"]