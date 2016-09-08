/**
 *  用于评论数据的存储
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },
  author: { type: String },
  create_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  mail: { type: String },
  url: { type: String },
  parentId: { type: ObjectId }
});


module.exports = mongoose.model('Comment', CommentSchema);
