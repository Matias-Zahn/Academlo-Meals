import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRestaurant } from './restaurant.schema.js';
import { RestaurantService } from './restaurant.service.js';
import { validateParitalReview, validateReview } from './review.schema.js';

export const findAllRestaurants = catchAsync(async (req, res, next) => {
   const restaurants = await RestaurantService.findAll();

   return res.status(200).json(restaurants);
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {
   const { restaurant } = req;

   return res.status(200).json(restaurant);
});

export const createRestaurant = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, restaurantData } = validateRestaurant(
      req.body
   );

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const restaurant = await RestaurantService.create(restaurantData);

   return res.status(201).json({
      restaurant,
   });
});
export const createReview = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   const { sessionUser } = req;
   const { hasError, errorMessages, reviewData } = validateReview(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const review = await RestaurantService.createReview({
      userId: sessionUser.id,
      comment: reviewData.comment,
      rating: reviewData.rating,
      restaurantId: id,
   });

   return res.status(201).json(review);
});

export const updateReview = catchAsync(async (req, res, next) => {
   const { review } = req;

   const { hasError, errorMessages, reviewData } = validateParitalReview(
      req.body
   );

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const reviewUpdated = await RestaurantService.updateReview(
      review,
      reviewData
   );

   return res.status(200).json(reviewUpdated);
});

export const deleteReview = catchAsync(async (req, res, next) => {
   const { review } = req;

   await RestaurantService.deleteReview(review);

   return res.status(204).json(null);
});
