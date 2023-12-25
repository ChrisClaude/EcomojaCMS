
module.exports = {
    routes:[{
        method: "GET",
        path:"/wish-list/user/:id",
        handler:"wish-list.findWishListByUserId"
    }
]
}