import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import { encryptedPassword } from '../../common/plugins/encripted-password.js';

const User = sequelize.define(
   'users',
   {
      id: {
         primaryKey: true,
         allowNull: false,
         autoIncrement: true,
         type: DataTypes.INTEGER,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      role: {
         type: DataTypes.ENUM('normal', 'admin'),
         allowNull: false,
         defaultValue: 'normal',
      },
      status: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      },
   },

   {
      hooks: {
         beforeCreate: async (user) => {
            user.password = await encryptedPassword(user.password);
         },
      },
   }
);

export default User;
