import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      metaTitle,
      metaDescription,
    } = req.body;

    if (!title || !slug || !excerpt || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const exists = await Blog.findOne({ slug });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists.",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      metaTitle,
      metaDescription,
      coverImage: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully.",
      blog,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getBlogs = async (req, res) => {

  try {

    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Server Error"
    });

  }

};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleBlog = async (req, res) => {

  try {

    const blog = await Blog.findOne({
      slug: req.params.slug,
    });

    if (!blog) {
      return res.status(404).json({
        success:false,
        message:"Blog not found",
      });
    }

    blog.views += 1;

    await blog.save();

    res.json({
      success:true,
      blog,
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }

};

export const deleteBlog = async (req, res) => {

  try {

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success:true,
      message:"Blog deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }

};
export const updateBlog = async (req, res) => {

  try {

    const updated = await Blog.findByIdAndUpdate(

      req.params.id,

      {
        ...req.body,

        ...(req.file && {
          coverImage: req.file.path,
        }),

      },

      {
        new:true,
      }

    );

    res.json({
      success:true,
      blog:updated,
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:"Server Error",
    });

  }

};