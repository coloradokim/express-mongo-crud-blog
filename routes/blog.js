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
  var errors = [];
  if(!req.body.title){
    errors.push('Your post must have a title')
  }
  if(!req.body.author) {
    errors.push(' Your post must have an author')
  }
  if(!req.body.post) {
    errors.push(' Your post must have content')
  }
  if (errors.length) {
    res.render('blog/new', {errors: errors})
  } else {
    postCollection.insert({
      title: req.body.title,
      author: req.body.author,
      blogPost: req.body.post,
      comments: [] });
    res.redirect('blog');
  }
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

router.post('/blog/:id/delete', function (req, res, next) {
  postCollection.remove({_id: req.params.id}, function (err, record) {
    if (err) throw err
  });
  res.redirect('/blog')
});

var counter = 0
router.post('/blog/:id', function (req, res, next) {
  counter++
  req.body.id = counter
  postCollection.findOne({_id:req.params.id}, function (err, record) {
    record.comments.push(req.body);
    postCollection.update({_id: req.params.id}, record, function (err, record) {
      res.redirect('/blog');
    });
  });
});

module.exports = router;
