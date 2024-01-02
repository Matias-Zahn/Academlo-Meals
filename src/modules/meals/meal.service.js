import Restaurant from '../restaurants/restaurants.model.js';
import Meal from './meals.models.js';

export class MealService {
   static async findAllMeals() {
      return await Meal.findAll({
         where: {
            status: true,
         },
         include: [
            {
               model: Restaurant,
            },
         ],
      });
   }

   static async findOneMeal(id) {
      return await Meal.findOne({
         where: {
            id: id,
            status: true,
         },
         include: [
            {
               model: Restaurant,
            },
         ],
      });
   }

   static async createMeal(data) {
      return await Meal.create(data);
   }

   static async updateMeal(meal, data) {
      return await meal.update(data);
   }

   static async deleteMeal(meal) {
      return await meal.update({ status: false });
   }
}
