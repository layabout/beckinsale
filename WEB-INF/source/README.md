Beckinsale
==========

传统开发流程中，UI做好原型页面给开发人员，开发人员再改写成后端模板页面，经常需要两边同步修改，步骤繁琐，容易出错。引入thymeleaf后，希望能利用其natural特性，实现前后端共同维护一套页面，提供开发效率。同时，通过webpack、gulp等项目自动化构建工具，自动完成前端项目资源编译、打包、压缩、发布等工作流。

构建目标
-------
* 使用Thymeleaf模板引擎解耦视图和后台数据，提供一个纯净的html模板方便前端人员编辑
* 项目以模块化方式开发，js、css、img等资源以模块为单位集中管理
* 资源路径插入
* js、css自动合并打包
* js、css公共文件自动分离，单独打包，优化加载时间
* 小体积图片文件自动base64转码,减少请求次数
* 大体积图片自动压缩
* 各种资源hash生成，解除浏览器cache
* 开发时无需手动刷新页面，通过监视文件变动自动刷新，提高开发效率

开发规范
-------

Todo
----
* 自动化mock接口，提供rest api模拟数据
* JavaScript单元测试

参考资料
-------
+ Webpack plugins
  - [imports-loader 解决不支持CommonJS规范的js包导入问题](https://github.com/webpack/docs/wiki/shimming-modules)
+ NPM  
  - [npm仓库查询地址](https://www.npmjs.com/)
  - [使用npm scripts的正确姿势](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
