import User from '../users/user.model.js';
import Restaurant from './restaurants.model.js';
import Review from './review.model.js';

export class RestaurantService {
   static async findAll() {
      return await Restaurant.findAll({
         where: {
            status: true,
         },
         include: [
            {
               model: Review,
            },
         ],
      });
   }

   static async findOneRestaurant(id) {
      return await Restaurant.findOne({
         where: {
            id: id,
            status: true,
         },
         include: [
            {
               model: Review,
            },
         ],
      });
   }
   static async create(data) {
      return await Restaurant.create(data);
   }

   static async updateRestaurant(restaurant, data) {
      return await restaurant.update(data);
   }

   static async deleteRestaurant(restaurant) {
      return await restaurant.update({ status: false });
   }

   static async createReview(data) {
      return await Review.create(data);
   }

   static async findOneReview(id) {
      return await Review.findOne({
         where: {
            id: id,
            status: true,
         },

         include: [
            {
               model: User,
            },
         ],
      });
   }

   static async updateReview(oldReview, newReview) {
      return await oldReview.update(newReview);
   }

   static async deleteReview(review) {
      return await review.update({ status: false });
   }
}
