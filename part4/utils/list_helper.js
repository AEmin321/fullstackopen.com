const _ =require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total,item) => total+item.likes,0)
}

const fevoriteBlog = (blogs)=> {
    const theObj= blogs.reduce((maxObject,currentObject)=>maxObject.likes>currentObject.likes?maxObject:currentObject,blogs[0])
    return theObj
}

const mostBlogs = (blogs)=> {
    const authors = _.countBy(blogs,'author')
    const maxAuthor = _.maxBy(_.keys(authors),(author)=>authors[author])
    return {author:maxAuthor,blogs:authors[maxAuthor]||0}
}

module.exports = {
    dummy,totalLikes,fevoriteBlog,mostBlogs
}