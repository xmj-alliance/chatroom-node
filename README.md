# chatroom-node
Angular的小型聊天室demo
A simple chatroom with node, koa, angular, socket.io, etc.

# 功能
- 登录

## Install dependencies
```
npm install
```
## Run

### 开发
```
npm run xxx
```

|   -   |  开发  |  编译  |
|:-----:|:------:|:-----:|
|  前端  |  `serve:c`[Webpack-dev-server]|  `build:c`[Webpack]  |
|  后台  |  N/A           |  `build:s`[Webpack]  |
|  一起  |  N/A  不存在的                |  `build`[Webpack] |

### 本地部署（要求先运行npm run build）
```
npm (run) start
```

## Testing
```
npm run test
```

## Notes
- 在tslint.json中设置前缀规则，默认是app，意味着component的标签都是`<app-xxx></app-xxx>`
- component的局部样式（貌似？）既可以用scss也可以用普通css
- 前端的assets存储页面资源（网页中的固定图片等），static存储用户资源。（跟vue的webpack学的）
- 后台的config存储网站配置信息（比如登录secret, 数据库连接等）
- 前端的assets 和 后台的config（除默认配置外） 都不会被存到在线代码库。

## 感谢
[softchris/angular4-webpack](https://github.com/softchris/angular4-webpack)

## 技术栈
- 前端：Angular Typescript(tslint, codelyzer) scss twitter-bootstrap 

- 后台：koa jwt 

- 其他：Webpack