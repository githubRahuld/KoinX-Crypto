# KoinX Backend Internship Assignment

This project is a backend service built with Node.js and MongoDB for KoinX's backend internship assignment. It includes tasks to fetch and store cryptocurrency data, provide real-time data via API endpoints, and calculate statistical metrics like standard deviation.

## Table of Contents
- [About](#about)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [API Endpoints](#api-endpoints)
---

## About

The project consists of:
1. A background job that periodically fetches the current price, market cap, and 24-hour change of three cryptocurrencies (Bitcoin, Matic, Ethereum) from CoinGecko's API and stores this information in a MongoDB database.
2. An API to retrieve the latest data for a specified cryptocurrency.
3. An API to calculate and return the standard deviation of the cryptocurrency price over the last 100 entries.

## Tech Stack
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: Database to store cryptocurrency data.
- **Mongoose**: ODM for MongoDB in Node.js.
- **Axios**: HTTP client for API requests.
- **node-cron**: Job scheduler for running tasks periodically.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/githubRahuld/KoinX-Crypto.git
   cd Koinx
2. **Install dependencies:**
    npm install
3. **Set up environment variables (see Environment Variables).**
4. **Start the server:**
     npm run dev

### Environment Variables
Create a .env file in the project root and add the following variables:
MONGO_URI=your_mongodb_connection_string
PORT=8002

### Features
1. Background Job: Fetches and stores cryptocurrency data every 2 hours.
2. API Endpoints:
   - /stats: Fetches the latest price, market cap, and 24-hour change for a specified cryptocurrency.
   - /deviation: Calculates and returns the standard deviation of the price for the last 100 entries.
     
### API Endpoints
 - GET /stats
Fetches the latest data for a specified cryptocurrency.

  - Query Parameters:
    - coin: bitcoin, matic-network, or ethereum
  - Sample Request:
      GET /stats?coin=bitcoin
  - Sample Response:
      {
      "price": 40000,
      "marketCap": 800000000,
      "change24h": 3.4
      }
    
- GET /deviation
Calculates the standard deviation of the price of the specified cryptocurrency based on the last 100 entries.

  - Query Parameters:
    - coin: bitcoin, matic-network, or ethereum
  - Sample Request:
    - GET /deviation?coin=bitcoin
  - Sample Response:
      {
      "deviation": 4082.48
      }


