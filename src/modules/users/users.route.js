import express from 'express';
import {
   deleteUser,
   findAllOrders,
   findOneOrder,
   login,
   singUp,
   updateUser,
} from './user.controller.js';
import {
   protect,
   protectAccountOwner,
   validateExisteUser,
} from './user.middleware.js';

export const router = express.Router();

router.post('/singup', singUp);
router.post('/login', login);

router.use(protect);

router
   .route('/:id')
   .patch(validateExisteUser, protectAccountOwner, updateUser)
   .delete(validateExisteUser, protectAccountOwner, deleteUser);

router.get('/orders', findAllOrders);
router.get('/orders/:id', findOneOrder);
