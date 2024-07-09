#!/bin/sh

# Build the application
npm run build

# Start the application

node -r tsconfig-paths/register dist/index.js
