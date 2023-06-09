"use strict";
const { Model } = require("sequelize");
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
        targetKey: "userId",
        foreignKey: "sourceUserId",
        onDelete: 'CASCADE',
      });

      this.belongsTo(models.User, {
        targetKey: "userName",
        foreignKey: "targetUserId",
        onDelete: 'CASCADE',
      });
    }
  }
  Like.init(
    {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sourceUserId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      targetUserId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      isLike: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
