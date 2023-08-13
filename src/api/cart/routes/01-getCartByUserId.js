
module.exports = {
    routes:[{
        method: "GET",
        path:"/carts/user/:id",
        handler:"cart.findByUserId"
    }
]
}