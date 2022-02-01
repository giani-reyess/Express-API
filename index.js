// Needed modules
const express = require('express')
const corsMiddleware = require('cors')
const routerApi = require('./routes')
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./Middleware/errorHandler')


// App object
const app = express()

// Midelware stack
app.use(express.json())
app.use(corsMiddleware())
routerApi(app)
app.use(logError)
app.use(boomErrorHandler)
app.use(errorHandler)


// Get the server running
const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})

