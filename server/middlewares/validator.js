import { check } from "express-validator";

export const signupValidator = [
  check("email").isEmail().withMessage("Please provide a valid email address."),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),
  check("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 24 characters."),
];

export const loginValidator = [
  check("email").isEmail().withMessage("Please provide a valid email address."),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Please provide a password for authorization."),
];

export const spendingValidator = [
  check("category").notEmpty().withMessage("Category is required."),
  check("subCategory").notEmpty().withMessage("Sub-category is required."),
  check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Amount must be a valid number greater than or equal to 0."),
  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  check("date")
    .notEmpty()
    .withMessage("Date is required.")
    .bail()
    .isISO8601()
    .withMessage("Date must be a valid ISO8601 date."),
];
