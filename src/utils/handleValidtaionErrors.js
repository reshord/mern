const validationResult = require('express-validator')

const validError = (req, res, next) => {
    const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
    
        }
    next()
}

module.exports = {validError}