'use strict';

/**
 *  cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) =>  ({
  async create(ctx) {
    // some logic here
    console.log('cart controller', ctx);
    console.log('body', ctx.request.body);
    const response = await super.create(ctx);
    // some more logic

    return response;
  }
}));
