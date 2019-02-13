const express = require('express');
const router = express.Router();

const cookieDb = [{id: 1, name: "Chocolate Chip", image: "https://www.chatelaine.com/wp-content/uploads/2007/03/anna-olson-chocolate-chip-cookie-feature.jpg"}];

function newId() {
  return cookieDb.map(cookie => cookie.id).sort()[cookieDb.length - 1] + 1;
}

/* BROWSE */
router.get('/', (req, res, next) => {
  console.log("Test");
  res.render('index', {cookies: cookieDb});
});

//ADD
router.get('/new', (req, res) => {
  res.render('newCookie');
});

router.post('/', (req, res) => {
  const { name, image } = req.body;
  /* SAME AS:
  const name = req.body.name;
  const image = req.body.image;
 */

  const id = newId();
  const newCookie = { id, name, image };
  cookieDb.push(newCookie);

  res.redirect('/cookies');
});

// READ
router.get('/:id', (req, res) => {
  const cookie = cookieDb.find(cookie => cookie.id === Number(req.params.id));
  res.render('cookie', {cookie});
});

//EDIT
router.get('/:id/edit', (req, res) => {
  const cookie = cookieDb.find(cookie => cookie.id === Number(req.params.id));

  console.log(cookie);
  
  res.render('editCookie', {cookie});
});

router.post('/:id', (req, res) => {
  const {name, image} = req.body;
  const index = cookieDb.findIndex(cookie => cookie.id === Number(req.params.id));
  const id = cookieDb[index].id;

  cookieDb[index] = { id, name, image };

  res.redirect('/cookies/'+id);
});

//DELETE
router.get('/:id/delete', (req, res) => {
  const index = cookieDb.findIndex(cookie => cookie.id === Number(req.params.id));
  cookieDb.splice(index, 1);

  res.redirect('/cookies'); 
});

module.exports = router;
