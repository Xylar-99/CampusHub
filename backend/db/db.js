const { Sequelize } = require('sequelize');
const path = require('path')

const file = path.join(__dirname , 'database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: file,
  logging: false, 
});

module.exports = sequelize;