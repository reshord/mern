const express = require('express')
const mongoose = require('mongoose')
const {loginValidation, registerValidation, postCreateValidation} = require('./validations')
const {checkAuth} = require('./src/utils/checkauth')
const {register, login, getMe} = require('./src/controllers/UserController')
const {create, update, remove, getAll, getOne} = require('./src/controllers/PostController')
const {validError} = require('./src/utils/handleValidtaionErrors')

const multer = require('multer')


mongoose
    .connect('mongodb+srv://admin:CrazyDima@cluster0.scpgs.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
       app.listen(4444, (e) => {
            e ? console.log(e) : console.log('server has been started');
       })
    })
    .catch((e) => console.log('error'))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploades')
    },

    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/auth/login', validError, login)

app.get('/auth/me', checkAuth, getMe)

app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, validError, postCreateValidation, create)
app.delete('/posts/:id', checkAuth, remove)
app.patch('/posts/:id', checkAuth, update)

app.post('/auth/register', validError, register)
