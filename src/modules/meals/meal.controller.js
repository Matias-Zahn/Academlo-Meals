import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMeal } from './meal.schema.js';
import { MealService } from './meal.service.js';

export const findAllMeals = catchAsync(async (req, res, next) => {
   const meal = await MealService.findAllMeals();

   if (!meal) return next(new AppError('Meals not found', 404));

   return res.status(200).json(meal);
});

export const findOneMeal = catchAsync(async (req, res, next) => {
   const { meal } = req;

   return res.status(200).json(meal);
});

export const createMeal = catchAsync(async (req, res, next) => {
   const { errorMessages, hasError, mealData } = validateMeal(req.body);
   const { id } = req.params;

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const meal = await MealService.createMeal({
      name: mealData.name,
      price: mealData.price,
      restaurantId: id,
   });

   return res.status(201).json(meal);
});
export const updateMeal = catchAsync(async (req, res, next) => {});
export const deleteMeal = catchAsync(async (req, res, next) => {});
