import express from "express";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import { signupValidator, loginValidator } from "../middlewares/validator.js";
import passport from "passport";
import { matchedData, validationResult } from "express-validator";
import spending from "./spending/spending.js";

const router = express.Router();

router.post("/signup", signupValidator, async (req, res) => {
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
    const user = await User.create({
      email: data.email,
      password: bcrypt.hashSync(data.password, 12),
      username: data.username,
    });

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);

        res.status(500).json({
          error: true,
          message: "Internal server error",
        });

        return;
      }

      res.status(201).json({
        error: false,
        message: "Registration successful.",
      });
    });
  } catch (err) {
    if (err.errors) {
      let messages = [];

      err.errors.forEach((error) => {
        if (error.validatorKey === "not_unique" && error.path === "email") {
          messages.push(`${error.value} has been registered. Login instead.`);
        }
      });

      return res.status(406).json({
        error: true,
        message: messages,
      });
    }

    return res.status(500).json({
      error: true,
      message: "Internal server error. Try again.",
    });
  }
});

router.post("/login", loginValidator, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      message: "Validation error.",
      details: errors.array().map((err) => err.msg),
    });
    return;
  }

  passport.authenticate("local", (err, user, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: true,
        message,
      });
      return;
    }

    if (!user) {
      res.status(401).json({
        error: true,
        message,
      });
      return;
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.error(loginErr);

        res.status(500).json({
          error: true,
          message: "Internal server error",
        });

        return;
      }

      res.status(200).json({
        error: false,
        message,
      });
    });
  })(req, res);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: true,
        message: "Internal server error. Try again.",
      });
    }

    res.status(200).json({
      error: false,
      message: "De-authentication successful.",
    });
  });
});

router.get("/auth-check", (req, res) => {
  if (req.user) {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

router.use("/spending", spending);

export default router;
