const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    {id : 1, name: 'test1'},
    {id : 2, name: 'test2'},
    {id : 3, name: 'test3'},
    ]

router.get('/', (req,res) => {
    res.send(genres);
    });

router.get('/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id));
        //404 Not Found
        if (!genre) return res.status(404).send('Not Found');
        res.send(genre)
     });

router.post('/', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req,res) => {
    //look up course, if doesnt exist return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Not Found');
    //validate, if bad entry return 400
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
       
    //update course, return updated course
    genre.name = req.body.name;
    res.send(genre);
})

router.delete('/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Not Found');
    //delete
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
})

function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(genre, schema);
  }

module.exports = router;