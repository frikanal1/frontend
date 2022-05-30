# Frikanalen web frontend

This is the new frontend, under active development, adapted to speak to the new backend, toches.

It is in a separate repo as we are migrating away from a monorepo.

## Running locally:

First, install the dependencies (obviously this requires yarn)

`yarn`

Then spin up a docker-compose with a database and backend with mock data:

`docker-compose up -d`

Then:

* `yarn run dev` - if you are using a local backend (in which case it will expect to find it at `localhost:8000`), or 
