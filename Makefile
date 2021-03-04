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

push:
	git push -u origin main

install:
	npm ci

help:
	./bin/gendiff.js -h
