const list_helper = require('../utils/list_helper')

describe ('Dummy', ()=> {
    test('dummy is :',()=> {
        const result = list_helper.dummy([])
        expect(result).toBe(1)
    })
})

describe ('Likes',()=> {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    test('total likes :',()=>{
        const totalLike = list_helper.totalLikes(listWithOneBlog)
        expect(totalLike).toBe(5)
    })
})