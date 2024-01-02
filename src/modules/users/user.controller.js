import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { verifyPassword } from '../../common/plugins/encripted-password.js';
import generateJWT from '../../common/plugins/generateJWT.plugin.js';
import {
   validateLoginUser,
   validatePartialUser,
   validateUser,
} from './user.schema.js';
import { UserService } from './user.service.js';

export const singUp = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, userData } = validateUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const user = await UserService.create(userData);

   const token = await generateJWT(user.id);

   return res.status(201).json({
      token: token,
      user: user,
   });
});

export const login = catchAsync(async (req, res, next) => {
   const { hasError, userData, errorMessages } = validateLoginUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const user = await UserService.findOneByEmail(userData.email);

   if (!user) return next(new AppError('User not found', 404));

   const isOkPassword = await verifyPassword(userData.password, user.password);

   if (!isOkPassword) return next(new AppError('Invalid credentials', 401));

   const token = await generateJWT(user.id);

   return res.status(201).json({
      token,
      user,
   });
});
export const updateUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   const { hasError, errorMessages, userData } = validatePartialUser(req.body);

   if (hasError)
      return res.status(422).json({ status: 'error', message: errorMessages });

   const userUpdated = await UserService.updateUser(user, userData);

   return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   await UserService.deleteUser(user);

   return res.status(204).json(null);
});

export const findAllOrders = catchAsync(async (req, res, next) => {
   const { sessionUser } = req;

   const orders = await UserService.findAllOrders(sessionUser.id);

   if (!orders) return next(new AppError('User not found', 404));

   return res.status(200).json(orders);
});

export const findOneOrder = catchAsync(async (req, res, next) => {
   const { sessionUser } = req;

   const { id: orderId } = req.params;

   const order = await UserService.findOneOrder(sessionUser.id, orderId);

   if (!order) return next(new AppError('Userssssssss not found', 404));

   return res.status(200).json(order);
});
