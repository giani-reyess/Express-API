const express = require("express")

// All router modules
const productsRouter = require("./productsRouter")
const usersRouter = require("./usersRouter")
const customerRouter = require("./customerRouter")

// Middleware router container
const routerApi = app => {

    // Run 'webrouter' router middleware in "/api/webver"
    const webrouter = express.Router()
    app.use("/api/webver", webrouter)

    // Webversion stack
    webrouter.use("/products", productsRouter)
    webrouter.use("/users", usersRouter)
    webrouter.use("/customer", customerRouter)
}

module.exports = routerApi
