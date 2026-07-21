import express from "express";

import {
  createBlog,
  getBlogs,
  getSingleBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// Create
router.post("/", upload.single("coverImage"), createBlog);

// Get all blogs
router.get("/", getBlogs);

// Get single blog by MongoDB ID (Admin)
router.get("/id/:id", getBlogById);

// Get single blog by slug (Public)
router.get("/:slug", getSingleBlog);

// Update
router.put("/:id", upload.single("coverImage"), updateBlog);

// Delete
router.delete("/:id", deleteBlog);

export default router;