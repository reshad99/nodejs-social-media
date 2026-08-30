.PHONY: help build up down logs stop restart clean test lint format migrate

help:
	@echo "NestJS Project - Available Commands:"
	@echo ""
	@echo "  make build              - Build Docker images"
	@echo "  make up                 - Start all services"
	@echo "  make down               - Stop all services"
	@echo "  make logs               - View application logs"
	@echo "  make stop               - Stop services without removing containers"
	@echo "  make restart            - Restart services"
	@echo "  make clean              - Remove all containers and volumes"
	@echo "  make shell              - Access NestJS app shell"
	@echo "  make shell-db            - Access PostgreSQL shell"
	@echo "  make test               - Run tests"
	@echo "  make lint               - Run linter"
	@echo "  make format             - Format code"
	@echo "  make migrate            - Run database migrations"
	@echo "  make seed               - Seed database with initial data"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f nestjs-api

stop:
	docker-compose stop

restart:
	docker-compose restart

clean:
	docker-compose down -v
	rm -rf dist node_modules

shell:
	docker-compose exec nestjs-api sh

shell-db:
	docker-compose exec postgres psql -U user -d nestjs_db

test:
	docker-compose exec nestjs-api npm test

lint:
	docker-compose exec nestjs-api npm run lint

format:
	docker-compose exec nestjs-api npm run format

migrate:
	docker-compose exec nestjs-api npm run prisma:migrate

seed:
	docker-compose exec nestjs-api npm run seed

install:
	docker-compose exec nestjs-api npm install
