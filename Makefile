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