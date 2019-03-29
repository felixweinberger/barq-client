# BarQ Client

# Project Title (Natalia)
## Brief description (600 words max) (Copy from landing page)
## screenshots (Copy from landing page)
![](http://barq-client/readme/img1.png)

## Getting Started
Each of the interfaces (Customer, Staff, and Admin) are a separate React app and expect to connect with the [BarQ Server] (https://github.com/felixweinberger/barq-server).

Steps:
1. Rename the .env.example files in /customer and /staff to .env and fill in necessary fields
2. Run BarQ server with docker-compose (check the [BarQ server repository] (https://github.com/felixweinberger/barq-server) for further details).
3. Double check that the BarQ server directory is named "barq-server" (this is to ensure that the front-end finds the correct docker network)
4. In the Barq-Client directory, run docker-compose build
5. In the Barq-Client directory, run docker-compose up

# Tech Stack
## Customer (Alan)
- React
- Redux
- Axios
- Socket.io-client

## Staff (Natalia)
## Admin (Egill)

# Contributors
- Natalia Rizzi
- Egill Hreinsson
- Alan Hu
- Felix Weinberger
- Rachel Bonny
