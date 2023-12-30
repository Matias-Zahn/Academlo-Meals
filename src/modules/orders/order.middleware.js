import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealService } from '../meals/meal.service.js';
import { OrderServices } from './orders.service.js';

export const validateExistMeal = catchAsync(async (req, res, next) => {
   const { mealId } = req.body;

   const findMeal = await MealService.findOneMeal(mealId);

   if (!findMeal) return next(new AppError('Meal not found', 404));

   req.meal = findMeal;
   next();
});

export const validateExistOrder = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const order = await OrderServices.findOneOrder(id);

   if (!order) return next(new AppError('Order not found', 404));

   if (order.status !== 'active')
      return next(
         new AppError('The status of the order must be active to be updated')
      );

   req.order = order;

   next();
});
