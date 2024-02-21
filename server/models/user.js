'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.History, { foreignKey : "UserId"})
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username Already Exists'
      },
      validate: {
        notNull: {
          msg: 'username cannot be null'
        },
        notEmpty: {
          msg: 'username cannot be empty'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password cannot be null'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};