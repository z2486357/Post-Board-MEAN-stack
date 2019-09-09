const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //console.log(post);
  post.save().then(
    (createedPost) => {
      //console.log(result);
      res.status(201).json({
        message: 'Post added successfully!',
        postId: createedPost._id,
      });
    }
  );

});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    //console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });

});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    //console.log(result);
    res.status(200).json({ message: "Post updated!" });
  })
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: "Post not found!" });
    }
  })
})

router.delete("/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  })
});

module.exports = router;
