'use strict';

/**
 * wish-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wish-list.wish-list', ({ strapi }) =>  ({
    async findWishListByUserId(ctx){
      try{
        const userId = ctx.params.id;
        const wishList = await strapi.db.query('api::wish-list.wish-list').findMany({ 
          select: ['*'],
          where: {
            users_permissions_user: userId},
            populate: {users_permissions_user:true, product:true}
          });

          const newWishList =  wishList.map(item => {
            delete item.users_permissions_user.provider;
            delete item.users_permissions_user.password;
            delete item.users_permissions_user.resetPasswordToken;
            delete item.users_permissions_user.confirmationToken;
            delete item.users_permissions_user.confirmed;
            delete item.users_permissions_user.blocked;
            return item;
          })

          if(newWishList){
            console.log(newWishList);
            return newWishList;
          }
          else {
            throw new NotFoundError('Wish list not found');
          }
      }
      catch(err){
        ctx.body = err
      }
    },
    async saveLocalStorageWishList(ctx){
      try{
        const wishList = ctx.request.body;
        const userId = wishList[0].Users_permissions_user.id;
        const entries = await strapi.db.query('api::wish-list.wish-list').findMany({
          select: ['*'],
          where: { users_permissions_user: userId},
          populate: { product: true },
        });
  
        if(wishList){
          if(entries){
            wishList.forEach(async (item) => {
              const wishListItem = entries.find((list)=> list.product.id === item.product.id);
              if(!wishListItem){
                const entry = await strapi.db.query('api::wish-list.wish-list').create({
                  data: {
                    product: item.product.id,
                    users_permissions_user: userId,
                  },
                });
                if(entry){
                  return entry;
                }
              }
            });
          }
          
        }
      }
      catch(error){
        console.log(error);
      }
      return Response.error()
  }
})    
);
