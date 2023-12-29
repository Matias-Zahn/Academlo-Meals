import Order from '../orders/orders.model.js';
import User from './user.model.js';

export class UserService {
   static async create(data) {
      return await User.create(data);
   }

   static async findOneByEmail(email) {
      return await User.findOne({
         where: {
            email: email,
            status: true,
         },
      });
   }

   static async findOneById(id) {
      return await User.findOne({
         where: {
            id: id,
            status: true,
         },
      });
   }

   static async updateUser(user, data) {
      return await user.update(data);
   }

   static async deleteUser(user) {
      return await user.update({ status: false });
   }

   static async findAllOrders(id) {
      return await User.findAll({
         where: {
            status: true,
            id: id,
         },
         attributes: {
            exclude: [, 'createdAt', 'updatedAt', 'status', 'password'],
         },

         include: [
            {
               model: Order,
               attributes: {
                  exclude: ['createdAt', 'updatedAt'],
               },
            },
         ],
      });
   }

   static async findOneOrder(userId, orderId) {
      return await User.findOne({
         where: {
            status: true,
            id: userId,
         },
         attributes: {
            exclude: [, 'createdAt', 'updatedAt', 'status'],
         },

         include: [
            {
               model: Order,
               where: {
                  id: orderId,
               },
               attributes: {
                  exclude: ['createdAt', 'updatedAt'],
               },
            },
         ],
      });
   }
}
