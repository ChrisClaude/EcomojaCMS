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
          users_permissions_user: userId},
          populate: {users_permissions_user:true, product:true}
        });

      if(cart){
        delete cart.users_permissions_user.provider
        delete cart.users_permissions_user.password
        delete cart.users_permissions_user.resetPasswordToken
        delete cart.users_permissions_user.confirmationToken
        delete cart.users_permissions_user.confirmed
        delete cart.users_permissions_user.blocked
        return cart
      }

      else {
        throw new NotFoundError('Cart not found');
      }
    }
    catch(err){
      console.log(err);
      ctx.body = err
    }
  }
}));
