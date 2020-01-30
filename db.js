//db connection
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/movies',{ useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Database connected"))
.catch((error)=>console.log(error));

module.exports=mongoose;