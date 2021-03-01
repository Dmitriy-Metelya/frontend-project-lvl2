test:
	npm test -- --watch

lint:
	npx eslint .

build:
	./bin/generate-version.js
	
publish:
	npm publish --dry-run

install:
	npm ci

help:
	./bin/gendiff.js -h
