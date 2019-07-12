var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var app =  express.Router();
var eventsData = [
    {
        name: 'Event 1',
        description: 'The firts event',
        date:'2019.06.30',
        time:'2:00am',
        duration:'1 hour',
        location:{
            streetAdde:'101 Main St',
            city:'Los Angeles',
            state:'CSA',
            zip:'51000',
            lon:'0',
            lat:'0',
        }},
    {name: 'Event 2',
        description: 'The second event',
        date:'2019.07.20',
        time:'3:00am',
        duration:'3 hour',
        location:{
            streetAdde:'202 Main St',
            city:'Los Angeles2',
            state:'CA',
            zip:'52000',
            lon:'2',
            lat:'2',
        }},
    {name: 'Event 3',
        description: 'The 3ere event',
        date:'2019.07.20',
        time:'3:00am',
        duration:'3 hour',
        location:{
            streetAdde:'202 Main St',
            city:'Los Angeles2',
            state:'CA',
            zip:'52000',
            lon:'2',
            lat:'2',
        }},
    {name: 'Event 4 vet',
        description: 'The 4th event',
        date:'2019.07.20',
        time:'3:00am',
        duration:'3 hour',
        location:{
            streetAdde:'202 Main St',
            city:'Los Angeles2',
            state:'CA',
            zip:'52000',
            lon:'2',
            lat:'2',
        }
    }

];
// api.use({
//     client_id: 'fdeaaff5d2bc4e47ae377b147c2eda63',
//     client_secret: 'a7953269bdc74e299d35fe4f168b058b'
// });

var redirect_uri = 'http://localhost:5000/ig/auth';
var token;
exports.authorize_user = function(req, res) {
    res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
    api.authorize_user(req.query.code, redirect_uri, function(err, result) {
        if (err) {
            console.log(err.body);
            res.send("Didn't work");
        } else {
            console.log('Yay! Access token is ' + result.access_token);
            token = result.access_token;
            res.send('You made it!!');
        }
    });
};

// This is where you would initially send users to authorize
app.get('/authorize_user', exports.authorize_user);
// This is your redirect URI
app.get('/auth', exports.handleauth);
 api.use({ access_token: '789840742.fdeaaff.a8ad349f6d424437a1b12227dea368ce' });
app.get('/image', function(req, res, next) {

    console.log('Yay!');
    var data1 = {hola:"John", lastName:"Doe", age:46};
     api.user_self_media_recent(function(err, medias, pagination, remaining, limit){
        // render the home page and pass in the popular images
        res.render('ig', {
            grams: [medias],
            varEvents: eventsData
        });
    });

});


app.get('/lol', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
module.exports = app;