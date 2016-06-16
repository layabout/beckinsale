Beckinsale
==========

使用npm scripts构建前端应用。传统开发流程中，UI做好原型页面给开发人员，开发人员再改写成后端模板页面，经常需要两边同步修改，步骤繁琐，容易出错。在引入thymeleaf后，希望能利用其natural特性，实现前后端共同维护一套页面。

目标
----
* 资源路径插入
* js、css自动合并打包
* 小体积图片文件自动base64转码
* 各种资源hash生成，解除cache
* 开发时无需手动刷新页面，通过监视文件变动自动刷新

参考
---
* https://github.com/keithamus/npm-scripts-example
* http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
