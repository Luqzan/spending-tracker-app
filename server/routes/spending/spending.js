import express from "express";
import { Category, Spending, SubCategory } from "../../models/index.js";
import { spendingValidator } from "../../middlewares/validator.js";
import { matchedData, validationResult } from "express-validator";

const router = express.Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: SubCategory });

    res.status(200).json({ error: false, categories });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: true,
      message: "Internal server error. Try again.",
    });
  }
});

router.post("/add", spendingValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      message: "Validation error.",
      details: errors.array().map((err) => err.msg),
    });
    return;
  }

  const data = matchedData(req);

  try {
    const spending = await Spending.create({
      amount: data.amount,
      description: data.description,
      date: data.date,
      userId: req.user.id,
      subCategoryId: data.subCategory,
    });

    res.status(200).json({ test: spending });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: true, message: "Internal server error. Try again." });
  }
});

export default router;
