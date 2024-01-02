import Meal from '../meals/meals.models.js';
import Restaurant from '../restaurants/restaurants.model.js';
import Review from '../restaurants/review.model.js';
import User from '../users/user.model.js';
import Order from './orders.model.js';

export class OrderServices {
   static async createOrder(data) {
      return await Order.create(data);
   }

   static async findaAllOrder(userid) {
      return await Order.findAll({
         where: {
            userId: userid,
         },
         include: [
            {
               model: Meal,
               include: [
                  {
                     model: Restaurant,
                  },
               ],
            },
         ],
      });
   }

   static async findOneOrder(id) {
      return await Order.findOne({
         where: {
            id: id,
         },
         include: [
            {
               model: User,
            },
         ],
      });
   }

   static async updateOrder(order) {
      return await order.update({ status: 'completed' });
   }

   static async deleteOrder(order) {
      return await order.update({ status: 'cancelled' });
   }
}
