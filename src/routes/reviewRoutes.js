import express from "express";

import upload from "../middleware/upload.js";

import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", upload.single("image"), createReview);

router.get("/", getReviews);

router.delete("/:id", deleteReview);

export default router;