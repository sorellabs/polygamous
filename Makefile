targets := polygamous.umd.js
bin = $(shell npm bin)
browserify := $(bin)/browserify polygamous.js

dist/$(targets): dist
	$(browserify) --standalone polygamous > $@

dist:
	mkdir dist

bundle: dist/polygamous.umd.js

clean:
	rm -rf dist

test:
	node ./test/minimal.js

.PHONY: test
