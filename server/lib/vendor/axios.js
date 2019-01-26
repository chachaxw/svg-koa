const fs = require('fs');
const axios = require('axios');

/**
 * axios 请求数据
 */
module.exports.default = module.exports = async (ctx, options) => {
    let url = options.url;
    // 请求mock数据
    if (ctx.env === 'development' && ctx.isMockAPI) {
        let mockFilePath = `./server/mock${url}.json`;
        let existsMockFilePath = await fs.existsSync(mockFilePath);
        if (existsMockFilePath) {
            let data = fs.readFileSync(mockFilePath, 'utf-8');
            return new Promise((resolve, reject) => {
                return resolve(JSON.parse(data));
            });
        }
        else {
            return {
                error: 'no file'
            }
        }
    } else {  // 请求url
        options.url = ctx.apiServer + options.url;
        options.headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        };

        return await axios(options).then((res) => {
            showInfo(ctx, 'info', res, {
                response: res.data
            });
            return res.data;
        }).catch((res) => {
            showInfo(ctx, 'error', res, {
                response: res.response
            });
            return {
                status: res.response,
                error: res.response
            };
        });
    }
};

function showInfo(ctx, type, res, option) {
    let defaults = {
        url: res.config.url,
        method: res.request.method
    };
    let options = JSON.stringify(Object.assign({}, defaults, option));

    if (type === 'info') {
        ctx.logger.info(options);
    } else if (type === 'error') {
        ctx.logger.error(options);
    }
}
