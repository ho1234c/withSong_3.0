require('dotenv').config({ path: './config/.env' });
const db = require('../src/server/models');

(async () => {
  try {
    await db.sequelize.sync();
    console.log('Success to database syncronize');
  } catch (error) {
    console.log(`Fail to database sync\n ${ error.name }: ${ error.message }`);
  }
  process.exit();  
})();