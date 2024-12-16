import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Spending = sequelize.define(
  "spending",
  {
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    paranoid: true,
  }
);

export default Spending;
