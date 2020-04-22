const Joi = require('joi');
const express = require ('express');
const app = express();
app.use(express.json());

const genres = [
{id : 1, name: 'test1'},
{id : 2, name: 'test2'},
{id : 3, name: 'test3'},
]

app.get('/', (req,res) => {
res.send('working');
});

app.get('/api/genres', (req,res) => {
    res.send(genres);
    });

    app.get('/api/genres/:id', (req, res) => {
        const genre = genres.find(c => c.id === parseInt(req.params.id));
        //404 Not Found
        if (!genre) return res.status(404).send('Not Found');
        res.send(genre)
     });


app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req,res) => {
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

app.delete('/api/genres/:id', (req,res) => {
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}...`))