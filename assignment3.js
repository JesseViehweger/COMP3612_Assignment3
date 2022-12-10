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

app.get('/api/paintings', (req, resp) => { 
    if (paintings.length == 0) {
        paintings = "There was no data found.";
    }
    resp.json(paintings) });

app.get('/api/painting/:id', (req, resp) => {
    const id = req.params.id;
    let matches =
        paintings.filter(obj => id == obj.paintingID);
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/painting/gallery/:id', (req, resp) => {
    const id = req.params.id;
    let matches =
        paintings.filter(obj => id == obj.gallery.galleryID);
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/painting/artist/:id', (req, resp) => {
    const id = req.params.id;
    let matches =
        paintings.filter(obj => id == obj.artist.artistID);

    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/painting/year/:min/:max', (req, resp) => {
    const min = req.params.min;
    const max = req.params.max;
    let matches =
        paintings.filter(obj => max >= obj.yearOfWork && min <= obj.yearOfWork);
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/painting/title/:text', (req, resp) => {
    const text = req.params.text.toUpperCase();
    let matches =
        paintings.filter(obj => obj.title.toUpperCase().includes(text) == 1);
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/painting/color/:name', (req, resp) => {
    const find = req.params.name.toUpperCase();
    let matches =
        paintings.filter(obj => {
            for (color of obj.details.annotation.dominantColors) {
                if (color.name.toUpperCase() == find) {
                    console.log(color.name)
                    return true;
                }
            }
        });
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/artists', (req, resp) => { 
    if (artists.length == 0) {
        artists = "There was no data found.";
    }
    resp.json(artists) });

app.get('/api/artists/:country', (req, resp) => {
    const country = req.params.country.toUpperCase();
    let matches =
        artists.filter(obj => country == obj.Nationality.toUpperCase());
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

app.get('/api/galleries', (req, resp) => { 
    if (galleries.length == 0) {
        galleries = "There was no data found.";
    }
    resp.json(galleries) });

app.get('/api/galleries/:country', (req, resp) => {
    const country = req.params.country.toUpperCase();
    let matches =
        galleries.filter(obj => country == obj.GalleryCountry.toUpperCase());
    if (matches.length == 0) {
        matches = "There was no data found.";
    }
    resp.json(matches);
});

let port = 8080;
app.listen(port, () => {
    console.log("Server running at port= " + port);
});

