bin							:= $(shell npm bin)
browserify			:= $(bin)/browserify polygamous.js

bundle:
	mkdir -p dist
	$(browserify) --standalone polygamous > dist/polygamous.umd.js

clean:
	rm -rf dist

test:
	node ./test/minimal.js

benchmark:
	node ./test/benchmarks/suite.js

.PHONY: test
