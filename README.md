# Note Taker 
![License: MIT](https://img.shields.io/badge/MIT-blue.svg) 

## Description 

Making the backend of note taker with express!

Deployed Application[]

## Installation 

To run this application, open it from visual studio code. On the left side of visual studio, look for the 'server.js' file at the bottom of the list. Right-click the file and then click 'Open integrated terminal'. This should open the terminal with the filepath and in the command line enter 'node server' to open the port for your local browser to use the application. Now enter 'localhost:3001/' in thr url of your browser.

Visual step by step: (IGNORE IF YOU'VE READ THE ABOVE)
-Open Visual Studio with this directory
-Right-click 'server.js' file, left side of Visual studio to 'Open integrated terminal'
-Enter 'node server' in the command line
-Enter 'localhost:3001/' in the url of your browser

## Sample Express Code

```js
// Import express, fs, path, and uuid modules to our server
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
```
Including modules needed for our server.


```js
// Import require("./db/db.json")
const db = require('./db/db.json');
```
Creating a variable that points to our database.


```js
// Create app.use(*middleware*){// -json, urlencoded, staticify(public)}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
```
Using middleware that helps parse incoming data with the express object.


```js
// GET request to send index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
```
An html route that listens for a GET request for the html page to send to the client.


```js
// GET request to fetch our api to send notes from db.json
app.get('/api/notes', (req, res) => {
    // Reading the data with the directed filepath, then parsing through the data
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        }
    })

});
```
An api route for a GET request with a specific endpoint to our database that will send to the client JSON with the content.


```js
// POST request to fetch our api to modify with parsed req.body data and push post to db.json with fs.writeFile
app.post('/api/notes', (req, res) => {

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If title and text input exists then create and save the new note
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    
```
An api route for a POST request to update the notes by creating a new object, writing and pushing it to the database.


```js
// DELETE request to delete specific note and specific data from db.json and push with fs.writeFile
app.delete('/api/notes/:id', (req, res) => {    

    // Create a for loop iterating thru the database 
    for (let i = 0; i < db.length; i++) {
        let note = db[i];

        // Checking for the same id and removing the object from database
        if (note.id == req.params.id) {
            db.splice(i, 1);
```
An api route for a DELETE request to delete the specific data from the database by checking the id and removing the object.


## Author Info 

#### Anthony

* [https://github.com/Blackswan1010](https://github.com/Blackswan1010) 

## License

 https://api.github.com/licenses/MIT 


