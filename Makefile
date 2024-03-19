CONTAINER_NAME=beenice

build:
	docker-compose -f docker/docker-compose.yml build

rebuild:
	docker-compose -f docker/docker-compose.yml build --no-cache

up:
	docker-compose -f docker/docker-compose.yml up -d && supabase start

down:
	docker-compose -f docker/docker-compose.yml down && supabase stop

rm:
	docker rm $(CONTAINER_NAME)

sh:
	docker exec -it $(CONTAINER_NAME) /bin/sh

logs:
	docker logs $(CONTAINER_NAME) -f

create-network:
	docker network create beeniceNetwork; \
	docker network connect beeniceNetwork $(CONTAINER_NAME)
	docker network connect beeniceNetwork supabase_kong_$(CONTAINER_NAME)