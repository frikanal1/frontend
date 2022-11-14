# Frikanalen web frontend

This is the new frontend, under active development, adapted to speak to the new backend, toches.

It is in a separate repo as we are migrating away from a monorepo.

## Running locally:

### Requirements

Yarn, Node, docker-compose

First, install the dependencies (Requires Yarn and Node)

`yarn`

Then build and run the backend services, or just spin up a docker-compose with a database and backend with mock data:

`docker-compose up -d`

Then:

`yarn run dev`