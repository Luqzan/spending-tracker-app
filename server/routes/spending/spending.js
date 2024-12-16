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

router.get("/get-all", async (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  try {
    const spendings = await req.user.getSpendings({
      order: [["date", "DESC"]],
    });
    res.status(200).json({ error: false, data: spendings });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: true, message: "Internal server error. Try again." });
  }
});

router.post("/add", spendingValidator, async (req, res) => {
  0;
  if (!req.user) {
    res.status(401).end();
    return;
  }

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
    await req.user.createSpending({
      amount: data.amount,
      description: data.description,
      date: data.date,
      subCategoryId: data.subCategory,
    });

    res
      .status(201)
      .json({ error: false, message: "Spending successfully created." });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: true, message: "Internal server error. Try again." });
  }
});

router.put("/:id", spendingValidator, async (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  try {
    const { id } = req.params;

    const isSpendingBelong = await req.user.hasSpending(id);

    if (!isSpendingBelong) {
      res.status(403).end();
      return;
    }

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
    await Spending.update(
      {
        amount: data.amount,
        description: data.description,
        date: data.date,
        subCategoryId: data.subCategory,
      },
      { where: { id: id } }
    );

    res
      .status(201)
      .json({ error: false, message: "Spending successfully edited." });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: true, message: "Internal server error. Try again." });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.user) {
    res.status(401).end();
    return;
  }

  try {
    const { id } = req.params;

    const isSpendingBelong = await req.user.hasSpending(id);

    if (!isSpendingBelong) {
      res.status(403).end();
      return;
    }

    await Spending.destroy({ where: { id: id } });

    res
      .status(200)
      .json({ error: false, message: "Spending successfully deleted." });
  } catch (err) {
    console.error(err);

    res
      .status(500)
      .json({ error: true, message: "Internal server error. Try again." });
  }
});

export default router;
