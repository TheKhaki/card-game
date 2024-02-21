'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {foreignKey : "UserId"})
    }
  }
  History.init({
    UserId: {type:DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'user id cannot be null'
      },
      notEmpty: {
        msg: 'user id cannot be empty'
      }
    }
  },
    win: {type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user id cannot be null'
        },
        notEmpty: {
          msg: 'user id cannot be empty'
        }
      }
    },
    lose: {type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'user id cannot be null'
        },
        notEmpty: {
          msg: 'user id cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};