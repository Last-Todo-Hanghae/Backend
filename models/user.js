'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User -> Todo
      this.hasMany(models.Todo, {
        sourceKey: 'userId',
        foreignKey: 'userId'
      });

      // User -> UserInfo
      this.hasOne(models.UserInfo, {
        sourceKey: 'userId',
        foreignKey: 'userId'
      });

      // User -> Token
      this.hasMany(models.Token, {
        sourceKey: 'userId',
        foreignKey: 'userId'
      });

      this.hasMany(models.Token, {
        sourceKey: 'userName',
        foreignKey: 'userName'
      });

      // User -> Like
      this.hasMany(models.Like, {
        sourceKey: 'userId',
        foreignKey: 'sourceUserId'
      });

      this.hasMany(models.Like, {
        sourceKey: 'userId',
        foreignKey: 'targetUserId'
      });
    }
  }
  User.init({
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    userPassword: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};