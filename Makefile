hash := $(shell git rev-parse --short HEAD)
tag := subash/bs.subashpathak.com:$(hash)
export PATH := $(PATH):$(PWD)/node_modules/.bin

dev:
	svelte-kit dev

build:
	svelte-kit build

preview: build
	svelte-kit preview

prepare:
	svelte-kit sync

check:
	svelte-check --tsconfig ./tsconfig.json

check-watch:
	svelte-check --tsconfig ./tsconfig.json --watch

lint:
	prettier --ignore-path .gitignore --check --plugin-search-dir=. .
	eslint --ignore-path .gitignore .

format:
	prettier --ignore-path .gitignore --write --plugin-search-dir=. .

build-container:
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag $(tag) .
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag subash/bs.subashpathak.com:latest .

deploy: build-container
	ssh subash@subashpathak.com " \
		cd personal-server && \
		docker-compose pull --quiet && \
		docker-compose up --detach && \
		docker system prune --all --volumes --force \
	"

.PHONY: dev build preview prepare check check-watch
.PHONY: lint format build-container deploy
