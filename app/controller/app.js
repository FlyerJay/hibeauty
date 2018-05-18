'use strict';

module.exports = app => {
    class AppController extends app.Controller {
        async index() {
            await this.ctx.render('app/app.js', {
              url: this.ctx.url.replace(/\/app/, '')
            });
        }
    }
    return AppController;
}