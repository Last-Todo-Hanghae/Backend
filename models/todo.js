"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User -> Todo
      this.belongsTo(models.User, {
        targetKey: "userId",
        foreignKey: "userId",
        onDelete: 'CASCADE',
      });
    }
  }
  Todo.init(
    {
      todoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      todoContent: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      todoIsDone: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      todoPriority: {
        allowNull: false,
        type: DataTypes.STRING,
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
      modelName: "Todo",
    }
  );
  return Todo;
};
