const PostModel = require('../modules/post')

const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        const post = await doc.save()
        res.json(post)
    }catch(e) {
        console.log(e);
    }
}
const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)
    }catch(e) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndUpdate({
            _id: postId,

        }, {
            $inc: {viewsCount: 1}
        }, {
            returnDocument: 'after'
        }, 
        (err, doc) => {
            if(err) {
                return ret.status(500).json({
                    message: 'Не удалось вернуть статью'
                })
            }

            if(!doc) {
                res.status(404).json({
                    message: 'Статья не найдена'
                })
            }
            res.json(doc)
        }
    )
    }catch(e) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete({
            _id: postId
        }, 
        (err, doc) => {
            if(err) {
                res.status(500).json({
                    message: 'Не удалось удалить статьи'
                })
            }
            if(!doc) {
                res.status(500).json({
                    message: 'Статья не найдена'
                })
            }
            res.json({
                success: true
            })
        })
    }catch(e) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}
const update = async (req, res) => {
    try {
       const postId = req.params.id

       await PostModel.updateOne({
            _id: postId
       }, {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags
       })
    }catch(e) {
        res.status(500).json({
            message: 'Не удалось обновить статьи'
        })
    }

    res.json({
        success: true
    })
}


module.exports = {create, getAll, remove, update, getOne}