const express = require('express');
const router = express.Router();
const bodyParser =require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const movie = require('./movie');


var dateAndTime=new Date();

//add movie
router.post('/',  (req, res)=> { 
    const {movieName,description,castAndCrew}=req.body;
    let errors=[];
    console.log("here");
    //logic to filter duplicate movies
    //dynamic check movieName
    /*if(req.body.movieName&&==movie.movieName)
    {
        //errors.push({msg:'movie exists'});
        res.send('movie already exists');
    }*/
        if (req.body._movieName && req.body._movieName != req.params.movieName)
         return res.status(400).json({error: 'ID in the body is not matching ID in the URL'})
    
    else{
        //res.send('movie is accepted');
        //constructor to create new movie list
        /*Note: within conditional loop constructors can be accepted
        but not functions.*/
        (new movie({'movieName' : req.body.movieName,'description' : req.body.description,'castAndCrew' : req.body.castAndCrew}))
        .save()
        .then(movie=>res.send("movie is added on"+'\n'+'\n'+dateAndTime+'\n'+'\n'+movie),
        res.send);
        /*methods r not accepting within loops   
            movie.create({
           movieName : req.body.movieName,
           description : req.body.description,
           castAndCrew : req.body.castAndCrew
       }, 
       function (err, movie) {
           if (err) return res.status(500).send("There was a problem adding the information to the database.");
           res.status(200).send(movie);
       });}*/  
    } 
});

//returns all movies in DB

router.get('/', function (req, res) {    
    movie.find({}, function (err, movie) {
if (err) return res.status(500).send("There was a problem finding the movie.");
res.status(200).send(movie);
});});

// returns movie by movieName
router.get('/:id', function (req, res) {    
    movie.find({movieName:req.body.movieName}, function (err, movie) {
if (err) return res.status(500).send("There was a problem finding the movie.");
res.status(200).send(movie);
});});

//delete movie 
router.delete('/:id',async(req,res)=>{
    return movie.findByIdAndDelete(req.params.id)
    .then((response) => {
        if(response) {
            return res.json({
                success: true,
                message: 'Deleted'
            })
        }
        else {
           throw {
               reason: "notDeleted"
           } 
        }
    })
    .catch(err => {
        if (err.reason = "notDeleted"){
            return res.json({
                success: false,
                message: 'Cannot delete' 
            })
        }
        else {
            return res.json({
                sucess: false,
                message: err
            })
        }
    })
    });

module.exports = router;
