const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const UserSchema = require('../modules/user')
const multer = require('multer')

const register = async (req, res) => {
    try {
        
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
    
        const doc = UserSchema({
            name: req.body.name,
            email: req.body.email,
            passwordHash: hash
        })
    
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'secret123',
        {
            expiresIn: '30d'
        })

        const {passwordHash, ...userData} = user._doc

        return res.json({
            ...userData,
            token
        })

    } catch(e) {
        console.log(e);
        return res.status(500).json({
            message: 'Не удалось зарегистрироваться', e
        })
    }
    

}

const login = async (req, res) => {
    try {
        const user = await UserSchema.findOne({email: req.body.email})

        if(!user) {
            return res.status(400).json({
                message: 'Пользователь не найден'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass) {
            return req.status(404).json({
                message: 'Неверный логин или пароль'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret123',
        {
            expiresIn: '30d'
        })
        const {passwordHash, ...userData} = user._doc

        return res.json({
            ...userData,
            token
        })


    } catch(e) {
        console.log(e);
        return res.status(500).json({
            message: 'Не удалось авторизоваться', e
        })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await UserSchema.findById(req.userId)
        if(!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {passwordHash, ...userData} = user._doc
        res.json(userData)
        
    } catch(e) {
        return res.status(500).json({
            message: 'Нет доступа'
        })
    }
}

module.exports = {register, login, getMe}