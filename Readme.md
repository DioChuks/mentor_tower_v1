# BACKEND INFRASTRUCTURE

This repository contains source codes for the backend infrastructure powering https://mentor-tower.com.ng

To get started with this repository:
1. Clone the repository
```
git clone git@github.com:DioChuks/mentor-tower.git
```

2. Fill in the env variables
```
MONGO_DB=<MONGO_DB_CLUSTER>
PAYSTACK_SECRET=<your_paystack_secret>
ENV=<dev/prod>
JWT_SECRET=<JWT_SECRET>
```

## Required Softwares
- Node/NPM: utilized package manager
- Git: version control system used
- Docker: used to run the infrastructure required by this service

## Running the service
To run the service:
```
npm run start
```
or
```
npm run watch
```

## API Documentation
Available once you run the service

