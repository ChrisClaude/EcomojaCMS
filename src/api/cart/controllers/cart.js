'use strict';

/**
 *  cart controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) =>  ({
  async findOne(ctx){
    try{
      console.log(ctx.params.id)
      const userId = ctx.params.id
      const cart = await strapi.db.query('api::cart.cart').findOne({ 
        select: ['id'],
        where: {
          users_permissions_user: userId}
        });
      console.log(cart)
      return cart
    }
    catch(err){
      console.log(err);
      ctx.body = err
    }
  }
}));
