/**
 *  blog对象的DataModel对象，用于存储MongoDb的模型。
 *  主要用于数据存储
 *  可以转换成ViewModle
 */
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
  reply_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
  create_at: { type: Date,default: Date.now },
  update_at: { type: Date, default: Date.now },
  deleted: {  type: Boolean, default: false },
  isStatic: { type: Boolean, default: false },
  staticUrl: { type: String },
  comment: {  type: Array }
});


module.exports = mongoose.model( 'BLog', BlogSchema );
