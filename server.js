// import express module to our server
const express = require('express');
// import require("./db/db.json")
const db = require('./db/db.json');
// create app variable pointing to new express object(express())
const app = express();

const PORT = 3001;
// app.use(*middleware*){
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

app.use(express.static('public'));
// -json, urlencoded, staticify(public)}
// 
// get/delete/post requests:
// 
// get request to send index.html, route: '/'
// get request to send notes.html, route: '/notes'
// 
// get request to fetch our api to send notes from db.json, route: '/api/notes'
// post request to fetch our api to modify with parsed req.body data and push post to db.json with fs.writeFile, route: '/api/notes', return res.json;
// delete request to delete specific note, *EXTRA CRED* remove specific data from db.json and push with fs.writeFile,  route: '/api/notes/:notes_id', return res.json;
// app.listen

app.listen(PORT, () => {
    console.log(`App listening at localhost:${PORT}`);
});
