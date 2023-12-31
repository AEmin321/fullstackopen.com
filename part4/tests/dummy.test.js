const list_helper = require('../utils/list_helper')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


describe ('Dummy', ()=> {
    test('dummy is :',()=> {
        const result = list_helper.dummy([])
        expect(result).toBe(1)
    })
})

describe ('Likes',()=> {
    test('total likes :',()=>{
        const totalLike = list_helper.totalLikes(blogs)
        expect(totalLike).toBe(36)
    })
})

describe('Max',()=>{
    const isit = {
        _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    test('max object:',()=>{
        const max = list_helper.fevoriteBlog(blogs)
        expect(max).toEqual(isit)
    })
})

describe('Most Blogs',()=>{
  test('Author with most blogs:',()=>{
    const maxAuthor = {
      author:'Robert C. Martin',
      blogs:3
    }
    const maxBlogs = list_helper.mostBlogs(blogs)
    expect(maxBlogs).toEqual(maxAuthor)
  })
})

describe('Most Likes',()=>{
  const mostLike = {
    author:'Edsger W. Dijkstra',
    likes:17
  }
  test('Author with most Like:',()=>{
    const findMostLikeAuthor = list_helper.mostLikes(blogs)
    expect(findMostLikeAuthor).toEqual(mostLike)
  })
})
