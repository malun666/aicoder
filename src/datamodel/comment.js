/**
<<<<<<< HEAD
 *  评论对象的DataModel对象，用于存储MongoDb的模型。
 *  主要用于评论数据存储
=======
 *  用于评论数据的存储
>>>>>>> 124e46062b19adaf638c8b3a36678aa7cd09e4c3
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },
  author: { type: String },
<<<<<<< HEAD
  mail: { type: Number, default: 0 },
  url: { type: String },
  create_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false }
=======
  create_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  mail: { type: String },
  url: { type: String },
  parentId: { type: ObjectId }
>>>>>>> 124e46062b19adaf638c8b3a36678aa7cd09e4c3
});


module.exports = mongoose.model('Comment', CommentSchema);
