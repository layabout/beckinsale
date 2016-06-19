if (process.env.NODE_ENV !== 'production') {
  require('../../../../templates/index.html')
}

require('../../commons/less/common.less');
require('./index.less');

document.write("hello,index!");
