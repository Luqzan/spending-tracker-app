import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      },
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

export default User;
