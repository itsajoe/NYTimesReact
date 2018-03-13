const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  body: {type: String},
  date: { type: Date},
  url: { type: String}
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
