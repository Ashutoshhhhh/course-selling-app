# Use official Node.js image
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV PORT=3000
ENV JWT_SECRET_USE="meraphoneiphone"
ENV JWT_SECRET_ADMIN="meraphonesamsung"
ENV MONGO_URI="mongodb+srv://ashutoshhnegi:htbKXI23MJ0fDY2h@ashutoshdb.edbwk.mongodb.net/course-selling-app"

# Start the application
CMD ["node", "server.js"]
