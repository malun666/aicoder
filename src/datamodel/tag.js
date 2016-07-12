/**
 *  blog对象的DataModel对象，用于存储MongoDb的模型。
 *  主要用于数据存储
 *  可以转换成ViewModle
 */
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  name: { type: String },
  remark: { type: String },
  visit_count: { type: Number, default: 0 },
  deleted: {  type: Boolean, default: false }
});


module.exports = mongoose.model( 'BLog', BlogSchema );
