PATH  := $(PATH):$(PWD)/node_modules/.bin
SHELL := env PATH=$(PATH) /bin/bash
HASH  := $(shell git rev-parse --short HEAD)
TAG   := subash/bs.subashpathak.com:$(HASH)

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

build-container: build
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag $(TAG) .
	docker buildx build --platform linux/amd64,linux/arm64 --push --tag subash/bs.subashpathak.com:latest .

deploy: build-container
	ssh subash@subashpathak.com " \
		cd personal-server && \
		docker-compose pull --quiet bs && \
		docker-compose up --detach bs \
	"

.PHONY: dev build preview prepare check check-watch
.PHONY: lint format build-container deploy
