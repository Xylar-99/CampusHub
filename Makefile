FILE = ./docker/docker-compose.yml


up:
	docker compose -f ${FILE} up --build 

down:
	docker compose -f ${FILE} down


fclean:
	docker compose -f ${FILE} down -v 

re:clean all
