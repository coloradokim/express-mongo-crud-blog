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

router.get('/blog/:id', function (req, res, next) {
  postCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('blog/show', {thePost: record});
  });
});

router.get('/blog/:id/edit', function (req, res, next) {
  postCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('blog/edit', {thePost: record});
  });
});

router.post('/blog/:id/update', function(req, res, next) {
  postCollection.updateById(req.params.id, {title: req.body.title, author: req.body.author, blogPost: req.body.post}, function (err, record) {
    if (err) throw err
  });
  res.redirect('/blog');
});

module.exports = router;
