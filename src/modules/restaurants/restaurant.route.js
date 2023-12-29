import express from 'express';
import {
   createRestaurant,
   createReview,
   deleteReview,
   findAllRestaurants,
   findOneRestaurant,
   updateReview,
} from './restaurant.controller.js';
import { protect, protectAccountOwner } from '../users/user.middleware.js';
import {
   validateExistRestaurant,
   validateExistReview,
} from './restaurant.middleware.js';

export const router = express.Router();

router.get('/', findAllRestaurants);
router.get('/:id', validateExistRestaurant, findOneRestaurant);

router.use(protect);
router.post('/', createRestaurant);

router.post('/reviews/:id', validateExistRestaurant, createReview);
router
   .route('/reviews/:restaurantId/:id')
   .patch(
      validateExistRestaurant,
      validateExistReview,
      protectAccountOwner,
      updateReview
   )
   .delete(
      validateExistRestaurant,
      validateExistReview,
      protectAccountOwner,
      deleteReview
   );
