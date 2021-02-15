install:
	npm install

publish:
	npm publish --dry-run

lint:
	npx eslint .

run:
	node bin/gendiff.js -h