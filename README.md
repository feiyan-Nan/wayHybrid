# glamor

> A Vue.js project

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 说明：

1.  config/index.js 中proxyTable是请求代理配置，和dev.env.js中的 “BASE_API” 配合使用
2.  src/components/XgPlayer 是修改过的西瓜视频播放器， 播放器样式，播放器上的分享等交互都在这里，这里没有引用node_modules资源，因其样式不符合要求，图标位置，control bar中元素位置不符要求，有改动，故将代码引入本地，修改之

## 目录结构

```
[目录]()
├── src                        // 源代码
│   ├── api                    // 所有请求接口
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
|   |-- jsNative               // 交互函数
│   ├── router                 // 路由
|   |-- utils                  // 工具函数
│   ├── views                  // view
|   App.vue                    // 入口 
```

```
## 路由(及参数)
|—— shareDetail // 分享出去的页面（contId=文章ID）
|—— detail      // 详情页面（contId=文章ID&uid=登陆者ID）

|-- aboutus     // 关于我们(version=版本号)
|   |-- communityRule  // 社区规范
|   |-- privacy        // 隐私政策
|   |-- useRule        // 使用协议
|-- communityRule // 社区规范
|-- privacy     // 隐私政策
|-- useRule     // 使用协议

|-- surprise    // 惊喜(uid=登陆者ID)
|-- |-- index   // 惊喜首页
|   |-- introduce   // 介绍
|   |-- raiders   // 惊喜攻略

|-- power //  能量
|-- |-- detail  //  能量值明细
|-- |-- raking  //  能量值排行

|--  credits  //  积分
|-- |-- mine    //  我的积分
|-- |-- rule    //  积分规则

|-- gift  //  礼物
|-- |-- creditsGift //  积分礼物详情

```