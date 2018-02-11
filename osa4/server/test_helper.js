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
module.exports = {runFixture, totalBlogs}
