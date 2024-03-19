PROJECT_NAME=beenice
CONTAINER_NAME_APP=app

build:
	docker-compose -f docker/docker-compose.yml build

rebuild:
	docker-compose -f docker/docker-compose.yml build --no-cache

up:
	docker-compose -f docker/docker-compose.yml -p "$(PROJECT_NAME)" up -d

down:
	docker-compose -f docker/docker-compose.yml -p "$(PROJECT_NAME)" down

sh:
	docker exec -it $(PROJECT_NAME)_$(CONTAINER_NAME_APP) /bin/sh

logs:
	docker logs $(PROJECT_NAME)_$(CONTAINER_NAME_APP) -f

db-up:
	supabase start --workdir ./src/

db-down:
	supabase stop --workdir ./src/

network:
	docker network connect $(PROJECT_NAME)_default supabase_kong_$(CONTAINER_NAME)