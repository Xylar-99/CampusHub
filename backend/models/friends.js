const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');



const friends = sequelize.define('friends', {
    id       : { type: DataTypes.INTEGER, autoIncrement: true , primaryKey : true,},
    user_id  : { type: DataTypes.INTEGER, allowNull: false , unique: true},
    friends_id : { type: DataTypes.JSON , allowNull: true  },
});


module.exports = friends;
