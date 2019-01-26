const bodyParser  = require('koa-bodyparser');
/**
 * bodyparser
 */
module.exports.default = module.exports = async (app) => {
    app.use(bodyParser());
    app.context.logger.info('body-parser initialized');
};
