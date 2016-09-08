/**
 *  用于用户数据的存储
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  create_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  UserName: { type: String },
  Password: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
