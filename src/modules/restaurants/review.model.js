import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Review = sequelize.define('reviews', {
   id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   comment: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   rating: {
      type: DataTypes.INTEGER,
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

export default Review;
