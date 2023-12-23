const logger = require('./logger')

const reqLogger = (req,res,next) => {
    logger.info ('method:',req.method)
    logger.info ('path:',req.path)
    logger.info ('body:',req.body)
    logger.info ('---')
    next()
}

const unknownEndPoint = (req,res) => {
    res.status(404).send({error:'This endpoint does not exist.'})
}

const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ','')
    }else {
        request.token=null
    }
    next()
}

const errorHnadler = (error,req,res,next) => {
    logger.error(error.message)

    if (error.name === 'CastError'){
        return res.status(400).send({error:'malformatted .'})
    }
    else if (error.name === 'ValidationError'){
        return res.status(400).json({error:error.message})
    }
    else if (error.name ===  'JsonWebTokenError') {
        return res.status(401).json({ error: error.message })
    }
    next(error)
}

module.exports = {
    reqLogger,unknownEndPoint,errorHnadler,tokenExtractor
}