const { body } = require('express-validator');

const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Не меньше 5 символов').isLength({min: 5}),
   
]


const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    body('name').isLength({min: 3}),
    body('avatarUrl').optional().isURL
]

const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString()
]


module.exports = {loginValidation, registerValidation, postCreateValidation}
