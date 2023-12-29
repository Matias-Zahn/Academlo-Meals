import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

const mealSchema = z.object({
   name: z
      .string({
         invalid_type_error: 'name must be a string',
         required_error: 'name is requerid',
      })
      .min(3)
      .max(60),
   price: z.number(),
});

export function validateMeal(data) {
   const result = mealSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: mealData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      mealData,
   };
}
