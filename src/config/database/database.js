import { Sequelize } from 'sequelize';
import { envs } from './../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
   logging: false,
});

const authenticate = async () => {
   try {
      await sequelize.authenticate();
      console.log('The DataBase has been conected 🤖');
   } catch (error) {
      console.error(error);
   }
};

const syncUp = async () => {
   try {
      await sequelize.sync();
      console.log('The DataBase has been synced 🍕');
   } catch (error) {
      console.error(error);
   }
};

export { authenticate, syncUp };
