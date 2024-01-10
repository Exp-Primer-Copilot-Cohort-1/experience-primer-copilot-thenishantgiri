// Create web server
//   GET /comments
//   POST /comments
//   GET /comments/:id
//   PUT /comments/:id
//   DELETE /comments/:id

// Import express
var express = require('express');

// Create router
var router = express.Router();

// Import comment model
var Comment = require('../models/comment');

// GET /comments
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    res.json({comments: comments});
  });
});

// POST /comments
router.post('/', function(req, res) {
  var comment = req.body;
  Comment.create(comment, function(err, comment) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'comment': comment, message: 'Comment Created'});
  });
});

// GET /comments/:id
router.get('/:id', function(req, res) {
  var id = req.params.id;
  Comment.findOne({'_id': id}, function(err, comment) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'comment': comment, message: 'Comment Created'});
  });
});

// PUT /comments/:id
router.put('/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  if (comment && comment._id !== id) {
    return res.status(500).json({err: "Ids don't match!"});
  }
  Comment.findByIdAndUpdate(id, comment, {new: true}, function(err, comment) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'comment': comment, message: 'Comment Updated'});
  });
});

// DELETE /comments/:id
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function(err, comment) {
    if (err) {
      return res.status(500).json({err: err.message});
    }
    res.json({'comment': comment, message: 'Comment Deleted'});
  });
});

// Export router
module.exports = router;