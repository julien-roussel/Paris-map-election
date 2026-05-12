# Suffra map

## Prequesites
To start project locally :
 - Docker
 - Docker compose

## Quick start

### Install dependencides :
```bash
docker compose run proxy-server npm install
docker compose run client npm install
docker compose down
```

### Set env configuration
Copy `.env.example` into `.env` the modify values if needed

### Start project
```bash
docker compose up -d
```
Then connect to localhost, with port configured in .env file (default 3000)