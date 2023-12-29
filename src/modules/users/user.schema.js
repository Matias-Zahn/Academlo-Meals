import z from 'zod';
import { extractValidationData } from '../../common/utils/extracValidator.js';

const singUpUserSchema = z.object({
   name: z
      .string({
         invalid_type_error: 'Name must be string',
         required_error: 'name is required',
      })
      .min(3, { message: 'name is to short' })
      .max(60, { message: 'name is to long' }),
   email: z
      .string({
         invalid_type_error: 'email must be a string',
         required_error: 'email is required',
      })
      .email({ message: 'Invalid email' }),

   password: z
      .string({
         invalid_type_error: 'password must be a string',
         required_error: 'Password is required',
      })
      .min(3)
      .max(60),

   role: z.string(),
});

const loginUserSchema = z.object({
   email: z
      .string({
         invalid_type_error: 'email must be a string',
         required_error: 'email is required',
      })
      .email({ message: 'Invalid email' }),
   password: z.string({
      invalid_type_error: 'password must be a string',
      required_error: 'Password is required',
   }),
});

export function validateUser(data) {
   const result = singUpUserSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}

export function validateLoginUser(data) {
   const result = loginUserSchema.safeParse(data);

   const {
      errorMessages,
      hasError,
      data: userData,
   } = extractValidationData(result);

   return {
      errorMessages,
      hasError,
      userData,
   };
}

export function validatePartialUser(data) {
   const result = singUpUserSchema.partial().safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}
