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
    const { title, subTitle, content } = req.body;
    const { token } = req.cookies;
    const info = JWT.verify(token, process.env.JWT_SECRET);

    const post = new postModel({
        title: title,
        subTitle: subTitle,
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

// update post
// create post router
router.put("/update", uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;

    if (req.file) {
        // get the extension of the file
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const etx = parts[parts.length - 1];

        // rename the file
        newPath = path + '.' + etx;
        fs.renameSync(path, newPath);
    }

    // create and add the post to the database
    const { title, subTitle, content, id } = req.body;
    const { token } = req.cookies;
    const info = JWT.verify(token, process.env.JWT_SECRET);
    const postDoc = await postModel.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.userId);

    if (!isAuthor) {
        return res.status(400).send({ message: "Unauthorize" });
    }

    try {
        await postDoc.updateOne({
            title,
            subTitle,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.status(200).send({ message: "Ok" });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});

// get all posts
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


// get post by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel
            .findById(id)
            .populate('author', ['name']);

        res.status(200).send(post);
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});

module.exports = router;