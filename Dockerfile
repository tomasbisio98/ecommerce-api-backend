# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port (ajusta si usás otro)
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]