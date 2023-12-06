const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total,item) => total+item.likes,0)
}

module.exports = {
    dummy,totalLikes
}