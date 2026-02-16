.PHONY: dev down reset-db logs shell migrate seed

dev:
	docker compose up --build

down:
	docker compose down

reset-db:
	docker compose down -v
	docker compose up -d db
	@echo "Waiting for db to be healthy..."
	@until docker compose exec -T db mysqladmin ping -h localhost -uapp -papp --silent; do sleep 2; done
	docker compose up --build web

logs:
	docker compose logs -f

shell:
	docker compose exec web bash

migrate:
	docker compose exec web npx prisma migrate deploy

seed:
	docker compose exec web npx prisma db seed

