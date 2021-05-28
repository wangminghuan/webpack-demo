;(function(){
  var __webpack_modules__ = {"./src/index.js":((module,__unused_webpack_exports,__webpack_require__) => {
         eval(`const fn = __webpack_require__("./src/foo.js");

console.log('---');
fn();`)}),
"./src/foo.js":((module,__unused_webpack_exports,__webpack_require__) => {
         eval(`const name = __webpack_require__("./src/boo.js");

module.exports = function () {
  console.log('Hi,' + name);
};`)}),
"./src/boo.js":((module,__unused_webpack_exports,__webpack_require__) => {
         eval(`var boo = 'I am boo';
module.exports = boo;`)})}
  var __webpack_module_cache__ = {};
  // The require function
 function __webpack_require__(moduleId) {
	// Check if module is in cache
	var cachedModule = __webpack_module_cache__[moduleId];
	if (cachedModule !== undefined) {
		return cachedModule.exports;
	}
	// Create a new module (and put it into the cache)
	var module = __webpack_module_cache__[moduleId] = {
		// no module.id needed
		// no module.loaded needed
		exports: {}
	};

	// Execute the module function
	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

	// Return the exports of the module
	return module.exports;
}
var __webpack_exports__ = __webpack_require__("./src/index.js");
})();