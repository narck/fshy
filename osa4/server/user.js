const mongoose = require('mongoose')

const User = mongoose.model('User', {
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean
})

User.format = (user) => {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

module.exports = User