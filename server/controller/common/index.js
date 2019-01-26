/**
 * 404
 */
const page404 = async (ctx, next) => {
    let locals = {
        title: '404 Not found'
    };
    await ctx.render('pages/404', locals);
};

module.exports.default = module.exports  = {
    page404
};
