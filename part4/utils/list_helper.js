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

module.exports = {
    dummy,totalLikes,fevoriteBlog
}