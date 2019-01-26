export function createProduct(ctx, data) {
    return ctx.axios(ctx, {
        url: '', 
        method: 'post',
        data,
    });
}
