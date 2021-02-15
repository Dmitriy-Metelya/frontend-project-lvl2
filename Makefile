install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

help:
	./bin/gendiff.js -h
