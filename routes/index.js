const express = require("express")

// All router modules
const productsRouter = require("./productsRouter")
const usersRouter = require("./usersRouter")
const customerRouter = require("./customerRouter")
const categoriesRouter = require("./categoriesRouter")
const ordersRouter = require("./ordersRouter")

// Middleware router container
const routerApi = app => {

    // Run 'webrouter' router middleware in "/api/webver"
    const webrouter = express.Router()
    app.use("/api/webver", webrouter)

    // Webversion stack
    webrouter.use("/products", productsRouter)
    webrouter.use("/users", usersRouter)
    webrouter.use("/customers", customerRouter)
    webrouter.use("/categories", categoriesRouter)
    webrouter.use("/orders", ordersRouter)
}

module.exports = routerApi
