import express from 'express';
import fetchuser from '../Middleware/fetchUser.js';
import Note from '../models/Notes.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Route 1: Get all the notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Add new notes (login required)
router.post('/addnote', fetchuser, [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Must be at least 20 characters").isLength({ min: 20 }),
], async (req, res) => {
    try {
        const { title, description, date, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();

        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 3: Update existing note
router.put('/updatenote/:id', fetchuser, [], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // New note
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(newNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 4: Delete existing note using DELETE /api/notes/deletenote/:id
router.delete('/deletenote/:id', fetchuser, [], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        let note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).send('Not found');
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note Deleted", note: note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

export default router;
