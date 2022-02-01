const express = require("express")

// All router modules
const productsRouter = require("./productsRouter")
const settingsRouter = require("./settingsRouter")
const usersRouter = require("./usersRouter")

// Middleware router container
const routerApi = app => {

  // Run 'webrouter' router middleware in "/api/webver"
  const webrouter = express.Router()
  app.use("/api/webver", webrouter)

  // Webversion stack
  webrouter.use("/products", productsRouter)
  webrouter.use("/settings", settingsRouter)
  webrouter.use("/users", usersRouter)

  // Run 'mobilerouter' router middleware in "/api/mobilever"
  const mobilerouter = express.Router()
  app.use("/api/mobilever", mobilerouter)

  // Mobile version stack
  mobilerouter.use("/products", productsRouter)
  mobilerouter.use("/settings", settingsRouter)
  mobilerouter.use("/users", usersRouter)
}

module.exports = routerApi
