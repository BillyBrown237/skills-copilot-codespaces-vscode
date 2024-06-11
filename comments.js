// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments');

// Use body parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    res.send(comment);
  }
});

// Create new comment
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    email: req.body.email,
    body: req.body.body
  };
  comments.push(comment);
  res.send(comment);
});

// Update comment
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.body = req.body.body;
    res.send(comment);
  }
});

// Delete comment
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === parseInt(req.params.id));
  if (!comment) {
    res.status(404).send('The comment with the given ID was not found');
  } else {
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
  }
});

// Listen to port
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});