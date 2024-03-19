## About

Beenice is an app to give and receive positive messages from strangers who you can connect with if both parties consent.

## Installation

The whole application is dockerised, therefore you only need to run a few commands that are already prepared for you in the `Makefile`.

### Requirements:
- [Docker](https://www.docker.com/)
- [Supabase](https://supabase.com/)
- [Deno](https://deno.com/) (**optional** - for developing Supabase edge functions)

### 1. Build the project:
This will build the frontend's Docker images.
```bash
make build
```

### 2. Run the project:
This will build the frontend's Docker containers and/or start them.
```bash
make up
```

### 3. Run Supabase
This will create all the Supabase containers and/or start them.

```bash
supabase start
```

### 4. Create the network
This will create a docker network connecting the frontend NextJS application to Supabase.

```bash
make create-network
```