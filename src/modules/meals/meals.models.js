import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Meal = sequelize.define('meals', {
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
   price: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
   },
});

export default Meal;
