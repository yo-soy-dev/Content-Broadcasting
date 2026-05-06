import express from "express";
import { getLiveContentByScreen } from "../controllers/live.controller.js";

const router = express.Router();

router.get("/:screenId", getLiveContentByScreen);

export default router;