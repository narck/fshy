const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

User.format = (user) => {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

module.exports = User