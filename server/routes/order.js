import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js';
import { getAllOrders, getOrderDetails, getUserOrders, createOrder, trackOrders } from "../controllers/order.js";

const router = express.Router()

//post
router.post('/create', verifyToken, createOrder)

router.get('/user', verifyToken, getUserOrders)

router.get('/', verifyToken, getAllOrders)

router.get('/:id', verifyToken, getOrderDetails)

router.put('/:id/tracking', verifyToken, trackOrders)

export default router