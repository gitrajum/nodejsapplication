const mongoose=require('mongoose');
const movieSchema =new mongoose.Schema({

    movieName:String,
    description:String,
    castAndCrew:String,
    
});
 mongoose.model('movie',movieSchema);
module.exports = mongoose.model('movie');