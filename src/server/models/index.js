const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const { DATABASE } = require('../config');

const sequelize = new Sequelize(
  DATABASE.POSTGRES.DB_NAME,
  DATABASE.POSTGRES.USER,
  DATABASE.POSTGRES.PASSWORD,
  {
    host: DATABASE.POSTGRES.HOST,
    port: DATABASE.POSTGRES.PORT,
    dialect: 'postgres',
    logging: false
  },
);

const db = [];

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.js') && file !== 'index.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
