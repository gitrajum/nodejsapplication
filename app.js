
const express=require('express');
const app=express();
const db=require('./db');
const controller = require('./movie/controller');

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.use('/movies',controller);
app.use('/movies/:id',controller);


var PORT=4000;
app.listen(PORT, ()=> console.log("Server started on port   "+`${PORT}`));
module.exports = app;