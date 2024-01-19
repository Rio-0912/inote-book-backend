const express = require('express')
const fetchuser = require('../Middleware/fetchUser')
const Note = require('../models/Notes')
const router = express.Router()
const { body, validationResult } = require("express-validator");


// Route 1 Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
})

// Add new notes login req
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Must of atleast 20 charater").isLength({ min: 8 }),

], async (req, res) => {
    try {
        const { title, description, date, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


// Route 3 update existing node
router.put('/updatenote/:id', fetchuser, [], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // new node
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send('not found')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed')
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(newNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
// route 4: delte existing note using delte api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, [], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send('not found')
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed')
        }
        // res.json({note:note})
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Succes": "Note Delted", note: note })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router