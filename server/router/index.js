const mainCtrl = require('../controller/index');

module.exports.default = module.exports = [
    {path: '', ctrl: mainCtrl.pageHome},
    {path: 'api/upload', ctrl: mainCtrl.uploadFile, method: 'post'},
    {path: 'api/test', ctrl: mainCtrl.testApi, method: 'post'}
];
