import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Code considered harmful',
      author: 'moro',
      likes: 9999
    }

    const blogC = shallow(<SimpleBlog blog={blog} />)

    const contentDiv = blogC.find('.content')

    const title = contentDiv.find('.title')
    const likes = contentDiv.find('.likes')

    expect(title.text()).toContain(blog.title)
    expect(title.text()).toContain(blog.author)
    expect(likes.text()).toContain(blog.likes)
  })
})