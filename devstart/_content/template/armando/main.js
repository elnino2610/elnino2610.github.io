
function requireAll(r) {
	r.keys().forEach(r);
}
/**
 * Require all page pug, html
 */

requireAll(require.context('./app/', false, /.(html)$/));
