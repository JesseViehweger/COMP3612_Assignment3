//COMP 3612
//Assignment 3
//Jesse Viehweger
//Jvieh721@mtroyal.ca
//December 9th, 2022

const fs = require('fs');
const path = require('path');
const express = require('express');

let jsonPath = path.join(__dirname, 'public',
    'paintings-nested.json');
let jsonData = fs.readFileSync(jsonPath, 'utf8');
const paintings = JSON.parse(jsonData);

jsonPath = path.join(__dirname, 'public',
    'artists.json');
jsonData = fs.readFileSync(jsonPath, 'utf8');
const artists = JSON.parse(jsonData);

jsonPath = path.join(__dirname, 'public',
    'galleries.json');
jsonData = fs.readFileSync(jsonPath, 'utf8');
const galleries = JSON.parse(jsonData);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/paintings', (req, resp) => { resp.json(paintings) });

app.get('/api/painting/:id', (req, resp) => {
    const id = req.params.id;
    const matches =
        paintings.filter(obj => id == obj.paintingID);
    resp.json(matches);
});

app.get('/api/painting/gallery/:id', (req, resp) => {
    const id = req.params.id;
    const matches =
        paintings.filter(obj => id == obj.gallery.galleryID);
    resp.json(matches);
});

app.get('/api/painting/artist/:id', (req, resp) => {
    const id = req.params.id;
    const matches =
        paintings.filter(obj => id == obj.artist.artistID);
    resp.json(matches);
});

app.get('/api/painting/year/:min/:max', (req, resp) => {
    const min = req.params.min;
    const max = req.params.max;
    const matches =
        paintings.filter(obj => max >= obj.yearOfWork && min <= obj.yearOfWork);
    resp.json(matches);
});

app.get('/api/painting/title/:text', (req, resp) => {
    const text = req.params.text.toUpperCase();
    const matches =
        paintings.filter(obj => obj.title.toUpperCase().includes(text) == 1);
    resp.json(matches);
});

app.get('/api/painting/color/:name', (req, resp) => {
    const find = req.params.name.toUpperCase();
    const matches =
        paintings.filter(obj => 
            {   
                for (color of obj.details.annotation.dominantColors){  
                    if(color.name.toUpperCase() == find){
                        console.log(color.name)    
                        return true;
                    }
                }
            });           
    resp.json(matches);
});

app.get('/api/artists', (req, resp) => { resp.json(artists) });

app.get('/api/artists/:country', (req, resp) => {
    const country = req.params.country.toUpperCase();
    const matches =
        artists.filter(obj => country == obj.Nationality.toUpperCase());
    resp.json(matches);
});

app.get('/api/galleries', (req, resp) => { resp.json(galleries) });

app.get('/api/galleries/:country', (req, resp) => {
    const country = req.params.country.toUpperCase();
    const matches =
        galleries.filter(obj => country == obj.GalleryCountry.toUpperCase());
    resp.json(matches);
});

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});

