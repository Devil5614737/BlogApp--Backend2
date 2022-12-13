const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const Slugify = require("../helpers/Slugify");

router.get("/get-blog", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/create-blog", async (req, res) => {
  const { title, desc, markdown } = req.body;
  try {
    const newBlog = new Blog({
      title,
      desc,
      markdown,
    });
    await newBlog.save();
    res.status(200).json("blog created");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase();
    const blog = await Blog.find({ slug });
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// deleting the blog;
router.post("/remove-blog", async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.body.slug });
    return res.status(200).json(blog);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

// editing blog functionality
router.put("/edit-blog", async (req, res) => {
  const { title, desc, markdown } = req.body;
  try {
    Blog.findOneAndUpdate(
      { slug: req.body.slug },
      {
        $set: {
          title,
          desc,
          markdown,
        },
      }
    ).then(() => res.json("edited"));
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
