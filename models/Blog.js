const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  desc: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  markdown: { type: String, require: true },
  sanitizedHtml: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

blogSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
});
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
