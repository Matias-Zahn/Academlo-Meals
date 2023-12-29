import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

export const reviewSchema = z.object({
   comment: z
      .string({
         invalid_type_error: 'comment must be string',
         required_error: 'comment is requerid',
      })
      .min(3)
      .max(60),
   rating: z.number().min(1).max(5),
});

export function validateReview(data) {
   const result = reviewSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: reviewData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      reviewData,
   };
}

export function validateParitalReview(data) {
   const result = reviewSchema.partial().safeParse(data);

   const {
      hasError,
      errorMessages,
      data: reviewData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      reviewData,
   };
}
