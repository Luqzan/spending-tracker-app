import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const SubCategory = sequelize.define(
  "subCategory",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
    },
  },
  {
    paranoid: true,
  }
);

export default SubCategory;
