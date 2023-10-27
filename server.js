// import express module to our server
const express = require('express');
const fs = require('fs');
const path = require('path');
// import require("./db/db.json")
const db = require('./db/db.json');
// create app variable pointing to new express object(express())
const app = express();


const PORT = process.env.PORT || 3001;
// app.use(*middleware*){// -json, urlencoded, staticify(public)}
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

// get/delete/post requests:
// get request to send index.html, route: '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// get request to send notes.html, route: '/notes'
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// get request to fetch our api to send notes from db.json, route: '/api/notes'
app.get('/api/notes', (req, res) => {
    fs.readFileSync(db, "utf8");
    res.json(db);
});

// post request to fetch our api to modify with parsed req.body data and push post to db.json with fs.writeFile, route: '/api/notes', return res.json;
app.post('/api/notes', (req, res) => {

    const {title, text} = req.body;

    const newFeedback = {
        title,
        text
      };

    const feedBack = JSON.stringify(newFeedback);
    db.push(feedBack);
    fs.writeFile(db, feedback);
    res.json(db);
});

// delete request to delete specific note, *EXTRA CRED* remove specific data from db.json and push with fs.writeFile,  route: '/api/notes/:notes_id', return res.json;
app.delete('/api/notes/:id', (req, res) => {

});

// app.listen
app.listen(PORT, () => {
    console.log(`App listening at localhost:${PORT}`);
});
