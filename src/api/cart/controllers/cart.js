'use strict';

/**
 *  cart controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) =>  ({
  async findByUserId(ctx){
    try{
      const userId = ctx.params.id;
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
  },
  async saveLocalStorageCart(ctx){
    try{
      const cart = ctx.request.body;
      const userId = cart[0].Users_permissions_user.id;
      const entries = await strapi.db.query('api::cart.cart').findMany({
        select: ['*'],
        where: { users_permissions_user: userId},
        populate: { product: true, quantity:true },
      });

      if(cart){
        if(entries){
          cart.forEach(async (item) => {
            const cartItem = entries.find((cart)=> cart.product.id === item.product.id);
            if(cartItem){
              const qty = parseInt(item.productInstances) + parseInt(cartItem.quantity);
              const entry = await strapi.db.query('api::cart.cart').update({
                where: { users_permissions_user: userId, product: cartItem.product.id },
                data: {
                  quantity: qty,
                },
              });
            }
            else{
              const entry = await strapi.db.query('api::cart.cart').create({
                data: {
                  users_permissions_user: userId,
                  product: item.product.id,
                  quantity: item.productInstances,
                },
              });
            }
          });
        }
        
      }
    }
    catch(error){
      console.log(error);
    }
},}));