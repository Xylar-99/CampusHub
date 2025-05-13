const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');



const userInfo = sequelize.define('profiles', {
    user_id  : { type: DataTypes.INTEGER, allowNull: false , unique: true},
    img : { type: DataTypes.STRING, allowNull: false, unique: false, },
    fullName    : { type: DataTypes.STRING, allowNull: false, unique: false, },
    bio    : { type: DataTypes.STRING, allowNull: false, unique: false, },
    location    : { type: DataTypes.STRING, allowNull: false, unique: false, },
    phone    : { type: DataTypes.STRING, allowNull: false, unique: true, },
});


module.exports = userInfo;
