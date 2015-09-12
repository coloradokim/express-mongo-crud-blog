var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/blog-demo')
var postCollection = db.get('blogposts')

/* GET home page. */
router.get('/blog', function(req, res, next) {
  postCollection.find({}, function (err, records) {
    res.render('blog/index', {allPosts: records});
  });
});

router.get('/blog/new', function (req, res, next) {
  res.render('blog/new');
});

router.post('/blog', function (req, res, next) {
  postCollection.insert({title: req.body.title, author: req.body.author, blogPost: req.body.post});
  res.redirect('blog');
});



module.exports = router;
