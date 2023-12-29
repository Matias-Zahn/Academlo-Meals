import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Restaurant = sequelize.define('restaurants', {
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
   address: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
   },
});

export default Restaurant;
