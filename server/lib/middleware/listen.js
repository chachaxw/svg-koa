/**
 * 监听
 */
module.exports.default = module.exports = async (app) => {
    let port = app.context.port || 3030;
    app.listen(port, () => {
        app.context.logger.info(`server is listening on ${port}`);
        app.context.logger.info(`---------- mode: ${app.context.env} ----------`);
    });
};
