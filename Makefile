build: test lint fix-version

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

fix-version:
	./bin/generate-version.js
	
publish:
	npm publish --dry-run

install:
	npm ci

help:
	./bin/gendiff.js -h
