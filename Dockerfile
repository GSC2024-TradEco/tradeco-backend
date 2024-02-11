# Use the official Node.js runtime as a parent image
FROM node:alpine3.18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all app files to the container's working directory
COPY . .

# Expose port 9000
EXPOSE 9000

# Define the command to run your app
CMD ["npm", "run", "dev"]