/**
 *  评论对象的DataModel对象，用于存储MongoDb的模型。
 *  主要用于评论数据存储
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },
  author: { type: String },
  mail: { type: Number, default: 0 },
  url: { type: String },
  create_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
});


module.exports = mongoose.model('Comment', CommentSchema);
