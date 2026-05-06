import express from "express";
import Screen from "../models/Screen.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my", protect, async (req, res) => {
  const screens = await Screen.find({ teacher: req.user._id });
  res.json({ data: screens });
});

export default router;