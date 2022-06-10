PATH  := $(PATH):$(PWD)/node_modules/.bin
SHELL := env PATH=$(PATH) /bin/bash

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

.PHONY: dev build preview prepare check check-watch lint format
