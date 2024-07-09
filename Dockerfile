FROM node:latest

# Create app directory and set ownership
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Switch to the node user
USER node

# Install dependencies
RUN npm install --only=prod

# Copy application files
COPY --chown=node:node . .

# Copy start script and set permissions
COPY --chown=node:node start.sh .
RUN chmod +x start.sh

# Set environment variables
ENV MONGODB_URL=${MONGODB_URL}
ENV PAYSTACK_SECRET=${PAYSTACK_SECRET}
ENV JWT_SECRET=${JWT_SECRET}
ENV JWT_ACCESS_EXPIRATION_MINUTES=${JWT_ACCESS_EXPIRATION_MINUTES}
ENV JWT_REFRESH_EXPIRATION_DAYS=${JWT_REFRESH_EXPIRATION_DAYS}
ENV JWT_RESET_PASSWORD_EXPIRATION_MINUTES=${JWT_RESET_PASSWORD_EXPIRATION_MINUTES}
ENV JWT_VERIFY_EMAIL_EXPIRATION_MINUTES=${JWT_VERIFY_EMAIL_EXPIRATION_MINUTES}
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV CLIENT_URL=${CLIENT_URL}
ENV SMTP_HOST=${SMTP_HOST}
ENV SMTP_PORT=${SMTP_PORT}
ENV SMTP_USERNAME=${SMTP_USERNAME}
ENV SMTP_PASSWORD=${SMTP_PASSWORD}
ENV SMTP_FROM=${SMTP_FROM}
ENV SMTP_TPL_PATH=${SMTP_TPL_PATH}

# Expose port
EXPOSE 8000

# Command to run the start script
CMD ["./start.sh"]
