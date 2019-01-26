import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import qs from 'qs';
import { IncomingForm } from 'formidable';

const pageHome = async (ctx) => {
    const locals = {
        title: 'Home Page'
    };

    // appName 开发模式下不会加载生产后的 css,只有在路由对应的控制器设置
    ctx.state.appName = 'app';
    await ctx.render('pages/home', locals);
};

const uploadFile = async (ctx) => {
    let files = [];
    const uploadDir = path.resolve(__dirname, '../../public/temp');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(path.resolve(__dirname, '../../public/temp'), (err) => {
            if (err) throw err;
        });
    }

    const form = new IncomingForm({
        multiples: true,
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024,
        uploadDir,
    });

    form.on('file', (file) => {
        files.push[file];
    });

    form.parse(ctx.req, (err, fields, files) => {

        if (err) {
            ctx.throw(400, err);
        }

        const data = readFile(files.file.path);
        console.log(data);
    });

    ctx.status = 200;
    ctx.body = {
        status: 200,
        errMsg: 'File Uploaded!',
    };
};

const testApi = async (ctx) => {

    console.log(ctx.request.body);

    ctx.status = 200;
    ctx.body = {
        status: 200,
        errMsg: 'Ok',
    };
};

module.exports.default = module.exports = {
    pageHome,
    uploadFile,
    testApi,
};
