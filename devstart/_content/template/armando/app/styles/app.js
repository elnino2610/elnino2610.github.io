
function requireAll(r) {
	r.keys().forEach(r);
}
/**
* Require file app style
*/

// Base core
requireAll(require.context('_content/core/styles/base/', true, /.(scss|sass|css)$/));

// Base template
requireAll(require.context('./base/', true, /.(scss|sass|css)$/));

// Template Pattern
requireAll(require.context('_pattern/', true, /.(scss|sass|css)$/));

// Core Pattern
requireAll(require.context('_content/core/_pattern/', true, /.(scss|sass|css)$/));

// Template
requireAll(require.context('./', true, /.(scss|sass|css)$/));
