'use strict';

/**
 *  cart controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) =>  ({
  async findOne(ctx){
    try{
      const userId = ctx.params.id;
      console.log(userId);
      const cart = await strapi.db.query('api::cart.cart').findMany({ 
        select: ['*'],
        where: {
          users_permissions_user: userId},
          populate: {users_permissions_user:true, product:true}
        });

        const newCart =  cart.map(item => {
          delete item.users_permissions_user.provider;
          delete item.users_permissions_user.password;
          delete item.users_permissions_user.resetPasswordToken;
          delete item.users_permissions_user.confirmationToken;
          delete item.users_permissions_user.confirmed;
          delete item.users_permissions_user.blocked;
          return item;
        })

      if(newCart){
        return newCart;
      }

      else {
        throw new NotFoundError('Cart not found');
      }
    }
    catch(err){
      ctx.body = err
    }
  }
}));
