const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => {
        return acc + curr.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((acc, curr) => {
        if(curr.likes > acc.likes) {
            return curr
        }
        return acc
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}