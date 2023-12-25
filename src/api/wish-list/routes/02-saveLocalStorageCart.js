module.exports = {
    routes:[{
        method: "POST",
        path:"/wish-lists/save",
        handler:"wish-list.saveLocalStorageWishList"
    }
]
}