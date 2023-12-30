import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

const orderSchema = z.object({
   quantity: z.number(),
   mealId: z.number(),
});

export function validateOrder(data) {
   const result = orderSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: orderData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      orderData,
   };
}
