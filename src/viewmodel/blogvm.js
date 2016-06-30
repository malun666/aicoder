function BlogVM( opt ) {
  this.title = opt.title;
  this.author = opt.author;
  this.subtime = opt.subtime || new Date();
  this.delFlag = 0;
  this.lastModfiedOn = newDate();
  this.isPublis = false;
}

module.exports = BlogVM;
