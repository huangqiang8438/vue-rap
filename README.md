# eslint-test

> eslint规则脚手架配置

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
这两天依赖更新出现问题 install后无法跑起来 
在执行完cnpm install 命令后 找到 node_modules 下的 _prettier@1.13.0@prettier 将其删除 然后再执行 cnpm install prettier@~1.12.1 然后运行命令 npm run dev

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
