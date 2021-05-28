const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
let root = process.cwd()
// 分析模块内容
function readModuleInfo(filePath) {
  filePath =
    './' + path.relative(root, path.resolve(filePath)).replace(/\\+/g, '/')
  // 读取源码
  const content = fs.readFileSync(filePath, 'utf-8')
  const ast = parser.parse(content)
  const deps = []
  traverse(ast, {
    CallExpression: ({
      node
    }) => {
      // 如果是 require 语句，则收集依赖
      if (node.callee.name === 'require') {
        // 改造 require 关键字
        node.callee.name = '__webpack_require__'
        let moduleName = node.arguments[0].value
        moduleName += path.extname(moduleName) ? '' : '.js'
        moduleName = path.join(path.dirname(filePath), moduleName)
        moduleName = './' + path.relative(root, moduleName).replace(/\\+/g, '/')
        deps.push(moduleName)
        // 改造依赖的路径
        node.arguments[0].value = moduleName
      }
    }
  })
  const {
    code
  } = babel.transformFromAstSync(ast)
  return {
    filePath,
    deps,
    code,
  }
}
// 递归查找依赖
function buildDependencyGraph(entry) {
  // 获取入口模块信息
  const entryInfo = readModuleInfo(entry)
  const depArr = [];
  depArr.push(entryInfo)
  for (const modules of depArr) { // 只有for of 才可以进行迭代循环
    modules.deps.map((depPath) => {
      depArr.push(readModuleInfo(path.resolve(depPath)))
    })
  }
  return depArr
}

function buildJs(depArr) {
  const moduleArr = depArr.map((item) => {
    return `"${item.filePath}":((module,__unused_webpack_exports,__webpack_require__) => {
         eval(\`${item.code}\`)})`
  })
  return `;(function(){
  var __webpack_modules__ = {${moduleArr.join(',\n')}}
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
})();`
}
function main(entry,ouput){
   fs.writeFileSync(ouput,buildJs(buildDependencyGraph(entry)))
}
main('./src/index.js','./build/bundle.js')