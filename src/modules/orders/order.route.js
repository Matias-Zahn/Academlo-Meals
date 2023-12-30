import express from 'express';
import { protect, protectAccountOwner } from '../users/user.middleware.js';
import {
   createOrder,
   deleteOrder,
   findAllOrders,
   updateOrder,
} from './orders.controller.js';
import { validateExistMeal, validateExistOrder } from './order.middleware.js';

export const router = express.Router();

router.use(protect);

router.post('/', validateExistMeal, createOrder);
router.get('/me', findAllOrders);
router.patch('/:id', protectAccountOwner, validateExistOrder, updateOrder);
router.delete('/:id', protectAccountOwner, validateExistOrder, deleteOrder);
