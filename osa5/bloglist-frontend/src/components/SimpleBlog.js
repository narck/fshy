import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="content">
    <div className="title">
      {blog.title} {blog.author}
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button className="but" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
