import Category from "./Category.model.js";
import Spending from "./Spending.model.js";
import SubCategory from "./SubCategory.model.js";
import User from "./User.model.js";

Category.hasMany(SubCategory);
SubCategory.belongsTo(Category);

User.hasMany(Spending);
Spending.belongsTo(User);

SubCategory.hasMany(Spending);
Spending.belongsTo(SubCategory);

export { Category, Spending, SubCategory, User };
