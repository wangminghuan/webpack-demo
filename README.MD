# webpack 模块化原理分析

## 说明

### webpack打包后代码
参考dist/bundle.js  

- 依赖拆分,生成模块依赖树，对每个模块进行再包装，使每个模块都拥有使用 module.exports 导出本模块和使用 `__webpack_require__` 引入其他模块的能力，放在`__webpack_modules__`对象下；  
- 定义`__webpack_require__`方法，优化执行效率，避免递归调用

### 实现的简易打包方法

参考myPack.js源码，打包后的代码再build/bundle.js下

## 运行

    npm run build   # 运行webpack(v5.38)

    npm run package # 运行自定义打包方法

## 参考

- [90 行代码的 webpack，你确定不学吗？](https://mp.weixin.qq.com/s/ZJBwPp64TKMl230SKxHluA)