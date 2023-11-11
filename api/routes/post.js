const router = require("express").Router();
const multer = require('multer')
const postModel = require('../models/post');
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
    const post = new postModel({
        title: title,
        subtitle: subtitle,
        content: content,
        cover: newPath
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
    // const 
    // try {
    //     const allPosts = await postModel.findById();
    //     res.status(201).send({ post: post });
    // }
    // catch (err) {
    //     res.status(400).send({ message: err });
    // }
});

module.exports = router;