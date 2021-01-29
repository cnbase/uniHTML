# uniHTML
### 已停止维护，且很多用起来不太方便。
### 推荐使用uni_html2(vue2) 或 uni_html3(vue3) 版本

### 一种基于vue-cli3构建的前端框架系统
本框架为前后端分离开发而设计，更多的是体现一种开发思想，是项目开发的底层框架。

- 允许前端开发者，通过简单配置，一键打包整个项目的不同模块系统。
- 允许第三方开发者，按框架目录结构开发模板供用户使用。

### 功能介绍

**效果图**

请看 `previews/` 目录

* 支持第三方模板导入，只需简单配置，自带 `uni_default` 模板主题
* 支持按模块module一键打包构建前后台系统
* 支持指定页面构建
* 支持按需和全量引入elementUI组件
* 后台侧边栏支持收缩，支持三级菜单
* 后台标签页支持右键操作，如关闭当前、关闭其他标签、刷新等

### 说明

**1. 安装说明**

* 下载文件，git clone https://github.com/ibzero/uniHTML.git
* 执行 `npm install`
* 配置 `src/config.js` 文件,`devMode及apiData`
* 本地测试 `npm run serve`
* 构建模块页面 `npm run build`

**2. 目录结构说明**

```
src/components 公共组件
src/elementui 商务蓝自定义element主题文件
src/uniCore 框架核心js处理文件
src/uniHTML 项目业务模块、第三方模板文件目录，主要的开发目录
src/uniHTML/模板名称/模块名称/pages.js 模块页面构建配置参数
src/uniHTML/模板名称/utils/ 模块函数库目录
src/uniHTML/模板名称/utils/api.js 模拟api返回数据，开发模式下使用
src/utils/ 框架函数库目录
src/utils/common.js 公共函数，随机字符函数
src/utils/iAjax.js 封装的axios函数
src/utils/token.js 浏览器sessionStroage处理函数
src/config.js 项目配置文件，非常重要！
```

**3. 配置 `按需/全量` 引入 `elementUI` 组件**

    查看 `src/config.js` 文件中 `babelMode` 配置
    `babelMode = true;//全量引入`
    `babelMode = false;//按需引入`

**4. 组件引入方式不同，语法不同**

参考各页面目录下相关 `.js` 文件

* 按需引入组件：

```
import {
    Container
} from 'element-ui';
Vue.use(Container);
```

* 全量引入组件：

```
import ElementUI from 'element-ui'
Vue.use(ElementUI);
```

**5. 打包构建方式的选择**

请参考 `config.js` 文件

注意：每次打包都会删除原构建目录所有文件重新打包，通过配置 `outputDir` 修改构建目录，避免覆盖原文件

```
buildMode=true;//全页面构建，打包全部文件
buildMode=false;//单页面构建，单独打包
pageName='index';//单页面构建时，页面名称
```

**6. 接口返回格式说明**

```
{
  "code": 0,//0表示成功，非0表示失败
  "data": {},
  "msg": "说明"
}
```

**7. 模板配置文件 `config.js`**

```
baseUrl:'', #网站域名
apiUrl:'', #接口域名
devMode:true, #开发模式
getApiUrl：正式模式，请求实际 api 接口
apiData：开发模式时，需要配置模拟数据js文件路径
```

**8. 自定义element主题说明**

* `src/elementui/business_blue/` 自定义 `elementUI` 主题样式

    不需要，可在页面 `.js` 文件，删除引用 `import '@/elementui/business_blue/theme/index.css'`

### 常见问题

**1. post请求本地.json文件，模拟接口提交时**

```
POST http://localhost:8080/api/login.json 404 (Not Found)
Uncaught (in promise) TypeError: Cannot set property 'type' of undefined
```

原因：绝大多数web服务器，都不允许静态文件响应POST请求

解决方式：
```
#修改 src/utils/iAjax.js
#改为开发模式，原理将post请求转为模拟get请求json文件
devMode = true;
```
