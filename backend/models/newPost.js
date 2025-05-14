const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');



const newPost = sequelize.define('posts', {
    user_id  : { type: DataTypes.INTEGER, allowNull: false , unique: false},
    img : { type: DataTypes.STRING, allowNull: false, unique: false, },
    title    : { type: DataTypes.STRING, allowNull: false, unique: false, },
    content    : { type: DataTypes.STRING, allowNull: false, unique: false, },
});


module.exports = newPost;
