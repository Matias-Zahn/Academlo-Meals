import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateOrder } from './orders.schema.js';
import { OrderServices } from './orders.service.js';

export const createOrder = catchAsync(async (req, res, next) => {
   const { meal } = req;
   const { sessionUser } = req;
   const { hasError, errorMessages, orderData } = validateOrder(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const totalPrice = orderData.quantity * meal.price;

   const order = await OrderServices.createOrder({
      mealId: meal.id,
      userId: sessionUser.id,
      totalPrice: totalPrice,
      quantity: orderData.quantity,
   });

   return res.status(201).json(order);
});

export const findAllOrders = catchAsync(async (req, res, next) => {
   const { sessionUser } = req;

   const orders = await OrderServices.findaAllOrder(sessionUser.id);

   return res.status(200).json(orders);
});

export const updateOrder = catchAsync(async (req, res, next) => {
   const { order } = req;

   const orderUpdated = await OrderServices.updateOrder(order);

   return res.status(200).json(orderUpdated);
});
export const deleteOrder = catchAsync(async (req, res, next) => {
   const { order } = req;

   await OrderServices.deleteOrder(order);

   return res.status(204).json(null);
});
