//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();

let path = require('path');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(morgan('tiny'));
app.listen(8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
//Lab endpoints
//1. Delete a movie by its ID - Done
app.delete('/movies/:id', movies.deleteOne);
//2. Delete an actor and all its movies
app.delete('/actor/:id/all', actors.deleteAll);
//3. Remove a movie from the list of movies of an actor
// Example: http://localhost:8080/actors/1234/987
app.delete('/actors/:id', movies.deleteOne);
//4. Remove an actor from the list of actors in a movie
app.delete('/movies/:id', movies.deleteOne);
//Delete movie by year
//5. Add an existing actor to the list of actors in a movie
app.put('/actors/:id/', actors.updateOne);
//6. Retrieve (GET) all the movies produced between year1 and year2, where year1>year2.


//tute - add student id to list of students in school doc
// Router.post('/:schoolId', function(req, res){
//     let scId = req.params.schoolID
//     School.findByID(scID, (err, school)=>{
//         if(err) res.json(err)
//         let stID = req.body.studentID
//         Student.findByID(stID, (err, student)=>{
//             if(err) res.json(err)
//             school.students.push(stID)
//             school.save((err, result)=>{
//                 if(err) res.json(err)
//                 res.redirect('/school')
//             })
//         })
//     })
// })


// School.find().populate('Students').exec

