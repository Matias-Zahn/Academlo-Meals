import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

const restaurantSchema = z.object({
   name: z
      .string({
         invalid_type_error: 'name must be  string',
         required_error: 'name is required',
      })
      .min(3, { message: 'name is to short' })
      .max(60, { message: 'name is to long' }),
   address: z
      .string({
         invalid_type_error: 'address must be  string',
         required_error: 'address is required',
      })
      .min(3, { message: 'address is to short' })
      .max(60, { message: 'address is to long' }),

   rating: z
      .number({
         invalid_type_error: 'rating must be  number',
         required_error: 'rating is required',
      })
      .min(1)
      .max(5),
});

export function validateRestaurant(data) {
   const result = restaurantSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: restaurantData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      restaurantData,
   };
}

export function validatePartialRestaurant(data) {
   const result = restaurantSchema.partial().safeParse(data);

   const {
      hasError,
      errorMessages,
      data: restaurantData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      restaurantData,
   };
}
