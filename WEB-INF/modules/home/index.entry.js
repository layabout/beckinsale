require("./index.less");

document.write("hello,welcome back webpack!!");
$("#hello").html("what a wondful world!");
var md = require("../common/a");
new md();
$("#asyncButton").on("click",function(){
  require.ensure(['./async-module'], function() {
    var async =  require('./async-module');
    alert(new async());
  });
})
