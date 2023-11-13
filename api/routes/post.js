const router = require("express").Router();
const multer = require('multer')
const postModel = require('../models/post');
const JWT = require('jsonwebtoken');
require('dotenv/config');
const fs = require('fs');

// middleware
const uploadMiddleware = multer({ dest: 'uploads/' })

// create post router
router.post("/create", uploadMiddleware.single('file'), async (req, res) => {
    // get the extension of the file
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const etx = parts[parts.length - 1];

    // rename the file
    const newPath = path + '.' + etx;
    fs.renameSync(path, newPath);

    // create and add the post to the database
    const { title, subtitle, content } = req.body;
    const { token } = req.cookies;
    const info = JWT.verify(token, process.env.JWT_SECRET);

    const post = new postModel({
        title: title,
        subtitle: subtitle,
        content: content,
        cover: newPath,
        author: info.userId
    });

    try {
        const postSaved = await post.save();
        res.status(201).send({ post: post });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});


router.get('/posts', async (req, res) => {
    try {
        const allPosts = await postModel
            .find()
            .populate('author', ['name'])
            .sort({ createAt: -1 })
            .limit(20);

        res.status(200).send({ posts: allPosts });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});



module.exports = router;