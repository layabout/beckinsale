var path = require('path');
var glob = require('glob');

module.exports = function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        var filename = basename.split('.')[0];
        if(extname == '.js')
          console.log('==== Find entry file ====>>> ' + entry);
        entries[filename] = ['./' + entry];
    }
    return entries;
}
