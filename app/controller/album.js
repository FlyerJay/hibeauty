'use strict';

module.exports = app => {
    class albumController extends app.Controller {
        async album() {
            const ctx = this.ctx;
            const list = await ctx.model.Album.list(ctx.query);
            ctx.body = list;
        }
        async picture() {
            const ctx = this.ctx;
            ctx.body = await ctx.model.Picture.list(ctx.params);
        }
    }
    return albumController;
}