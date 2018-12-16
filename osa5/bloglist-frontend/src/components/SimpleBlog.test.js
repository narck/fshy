import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
    title: 'Code considered harmful',
    author: 'moro',
    likes: 9999
  }

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blogC = shallow(<SimpleBlog blog={blog} />)

    const contentDiv = blogC.find('.content')

    const title = contentDiv.find('.title')
    const likes = contentDiv.find('.likes')

    expect(title.text()).toContain(blog.title)
    expect(title.text()).toContain(blog.author)
    expect(likes.text()).toContain(blog.likes)
  })

  it('calls onClick defined in props', () => {
      let i = 0;
      const cb = () => {i +=1};
      const blogC = shallow(<SimpleBlog blog={blog} onClick={cb} />)
      const button = blogC.find(".but")
      button.simulate('click');
      button.simulate('click');

      expect(i).toEqual(2);
  })
})
