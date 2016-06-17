require("./index.less");
require("./plugin.style.css");
require("./strength");

document.write("hello,welcome back webpack!!");
$("#hello").html("what a wondful world!");
$("#img01").attr('src',require('./fruit.jpg'));

var md = require("../common/a");
new md();
$("#asyncButton").on("click",function(){
  require.ensure(['./async-module'], function() {
    var async =  require('./async-module');
    alert(new async());
  });
})

$(document).ready(function($) {
  jQuery('#myPassword').strength({
            strengthClass: 'strength',
            strengthMeterClass: 'strength_meter',
            strengthButtonClass: 'button_strength',
            strengthButtonText: 'Show password',
            strengthButtonTextToggle: 'Hide Password'
        });

$('#demo1').click(function(e) {
        $('#myPassword').focus();
    });
});
