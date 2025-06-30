# Use the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the NestJS project
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
