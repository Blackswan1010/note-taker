// Import express module to our server
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Import require("./db/db.json")
const db = require('./db/db.json');
// Create app variable pointing to new express object(express())
const app = express();

const PORT = process.env.PORT || 3001;
// Create middleware
// app.use(*middleware*){// -json, urlencoded, staticify(public)}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET/POST/DELETE requests:
// GET request to send index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET request to send notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET request to fetch our api to send notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        }
    })

});

// POST request to fetch our api to modify with parsed req.body data and push post to db.json with fs.writeFile, route: '/api/notes', return res.json;
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

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Converting data into a JSON object
                const parsedData = JSON.parse(data);
                // Pushing the newNote object into the parsedData JSON object
                parsedData.push(newNote);

                db.push(newNote);

                // Writing updated notes back to db.json
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (writeErr) =>
                    writeErr ? console.error(writeErr) : console.info('Successfully updated note!'));
            }
        })

        const response = {
            status: 'success',
            body: newNote
        }

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note');
    }
});


// DELETE request to delete specific note and specific data from db.json and push with fs.writeFile
app.delete('/api/notes/:id', (req, res) => {

    for (let i = 0; i < db.length; i++) {
        let note = db[i];

        if (note.id == req.params.id) {
            db.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db, null, 2));

            break;
        }
    }

    console.info('Note deleted!');
    res.json('Note deleted!');
});

// app.listen
app.listen(PORT, () => {
    console.log(`App listening at localhost:${PORT}`);
});
