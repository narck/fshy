const Blog =  require('./blog')

const runFixture = async () => {
    for (var i = 0; i < 15; i++) {
        const n = new Blog({
            author: 'keijo' + i,
            title: 'keijon blogi ' + i,
            url: 'keijon.fi/ ' + i,
            likes: i
        })

        await n.save()
    }
}

const totalBlogs = async () => {
    const t  =await Blog.find({})
    return t.length
}

const someBlog = async () => {
    return await Blog.findOne({})
}

const blogExists = async (x) => {
    const lol = await Blog.findOne(x)
    return Object.keys(lol).length === 0
}
module.exports = {runFixture, totalBlogs, someBlog, blogExists}
