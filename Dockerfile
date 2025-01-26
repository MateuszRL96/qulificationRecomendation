# Use a Node.js image with a version >= 18.19 as the base image
FROM node:18.19

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application files
COPY . .

# Copy the proxy configuration file
COPY proxy.conf.json .

# Expose port 4200
EXPOSE 4200

# Run the Angular application with the proxy configuration
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--proxy-config", "proxy.conf.json"]
