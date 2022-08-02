const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || 'hello').replace(/Bearer\s?/, '')
    console.log(req.headers)

    if(token) {
        try {
            const decoded = jwt.verify(token, 'secret123')
            req.userId = decoded._id
            
            next()
            
        }catch(e) {
            return res.json({
                message: 'Нет доступа'
            })
        }
    }else {
       return res.status(403).json({
            message: 'Нет доступаdfg'
        })
    }

}

module.exports = {checkAuth}