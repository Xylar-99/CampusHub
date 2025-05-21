FILE = ./docker/docker-compose.yml

up:
	docker compose -f ${FILE} up --build 

down:
	docker compose -f ${FILE} down
	sudo rm -rf  ./frontend/images/*
	sudo rm -rf  ./frontend/uploads/*

fclean:
	docker compose -f ${FILE} down -v 

re:clean all
