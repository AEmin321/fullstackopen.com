const info = (...props) => {
    console.log(...props)
}

const error = (...props) => {
    console.error(...props)
}

module.exports = {
    info,error
}