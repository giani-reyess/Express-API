const express = require('express')
const ProductServices = require ('./../services/productServices')
const validatorHandler = require('./../Middleware/validatorHandler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require('./../schema/productSchema')


const router = express.Router()
const service = new ProductServices()


// GET all products by using 'find()'
router.get("/", async (req, res) => {
    const products = await service.find()
    res.json(products)
  })

// Get products by id using 'findOne()'
router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const productToRequest = await service.findOne(id)
      res.json(productToRequest)
    } catch (error) {
      next(error)
  }
})

// Create products by using 'create()'
router.post("/",
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body
    const productToPost = await service.create(body)
    res.status(201).json(productToPost)
})

// Update products by using 'update()'
router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const productToUpdate = await service.update(id, body)
    res.status(201).json(productToUpdate)
  } catch (error) {
    next(error)
  }
})

// Delete products by using 'delete()'
router.delete("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params
    const productToDelete = await service.delete(id)
    res.json(productToDelete)
})


module.exports = router
