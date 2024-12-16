import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const Category = sequelize.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
    },
  },
  {
    paranoid: true,
  }
);

export default Category;
