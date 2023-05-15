'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User -> Like
      this.belongsTo(models.User, {
        targetKey: 'userId',
        foreignKey: 'sourceUserId'
      });

      this.belongsTo(models.User, {
        targetKey: 'userName',
        foreignKey: 'targetUserId'
      });
    }
  }
  Like.init({
    likeId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    sourceUserId: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    targetUserId: {
      allowNull: false,
      type: DataTypes.BIGINT
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
    modelName: 'Like',
  });
  return Like;
};