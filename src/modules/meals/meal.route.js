import express from 'express';
import { protect, restrictTo } from '../users/user.middleware.js';
import {
   createMeal,
   deleteMeal,
   findAllMeals,
   findOneMeal,
   updateMeal,
} from './meal.controller.js';
import { validateExistMeal } from './meal.middleware.js';
import { validateExistRestaurant } from '../restaurants/restaurant.middleware.js';

export const router = express.Router();

router.get('/', findAllMeals);
router.get('/:id', validateExistMeal, findOneMeal);

router.use(protect);

router.use(restrictTo('admin'));

router
   .route('/:id')
   .post(validateExistRestaurant, createMeal)
   .patch(validateExistMeal, updateMeal)
   .delete(validateExistMeal, deleteMeal);
