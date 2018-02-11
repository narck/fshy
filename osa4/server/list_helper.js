const dummy = () => 1
const totalLikes = (x) => x.reduce((acc, cur) => acc + cur.likes, 0)
const favoriteBlog = (x) => x.reduce((a,b) => a.likes > b.likes ? a : b)

const mostBlogs = (x) => {
  const lol = {}
  for (var i=0; i<x.length; i++) {
    const author = x[i].author
    if (lol[author]) {
      lol[author] = lol[author] + 1
    }
    else {
      lol[author] = 1
    }
  }

  const most = Object.entries(lol).reduce((a,b) => a[1] > b[1] ? a : b)
  return {author: most[0], blogs: most[1]}
}

const mostLikes = (x) => {
  const lol = {}

  for (var i=0; i<x.length; i++) {
    const author = x[i].author

    if (lol[author]) {
      lol[author] = lol[author] + x[i].likes
    }
    else {
      lol[author] = x[i].likes
    }
  }

  const most = Object.entries(lol).reduce((a,b) => a[1] > b[1] ? a : b)
  return {author: most[0], likes: most[1]}
}

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }
