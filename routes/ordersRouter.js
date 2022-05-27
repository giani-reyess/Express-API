const express = require('express');

const OrderService = require('../services/orderService');
const validatorHandler = require('../Middleware/validatorHandler');
const {
    getOrderSchema,
    createOrderSchema,
    addOrderedItemSchema
} = require('../schema/orderSchema');

const router = express.Router();
const service = new OrderService();

router.get(
    '/:id',
    validatorHandler(getOrderSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const order = await service.findOne(id);
            res.json(order);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async(req, res) => {
    const orders = await service.find()
    res.json(orders)
});


router.post(
    '/',
    validatorHandler(createOrderSchema, 'body'),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newOrder = await service.create(body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
);

router.post(
    '/add-item',
    validatorHandler(addOrderedItemSchema, 'body'),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newItem = await service.addOrderedItem(body);
            res.status(201).json(newItem);
        } catch (error) {
            next(error);
        }
    }
);

router.delete(
    '/:id',
    validatorHandler(getOrderSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const deletedItem = await service.delete(id);
            res.status(201).json(deletedItem);
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;
