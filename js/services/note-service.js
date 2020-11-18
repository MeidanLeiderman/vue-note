'use strict'

import { utilService } from './util-service.js'

export default {
    duplicateNote,
    createNote,
    editNote,
    removeNote,
    addNote,
    queryNote,
    queryNotes
}

const NOTES_KEY = 'notes'
let gNotes;

function createNote(type, content, color = '#fff', pinned=false) {
    return {
        type,
        id: utilService.makeId(),
        content,
        pinned,
        created: Date.now(),
        color
    }
}

function editNote(noteToEdit) {
    if (!noteToEdit.id) {
        let newNote = createNote(noteToEdit.type, noteToEdit.content, noteToEdit.color, noteToEdit.pinned)
        gNotes.unshift(newNote)
    } else {
        let index = gNotes.findIndex(note => note.id === noteToEdit.id)
        gNotes.splice(index, 1, noteToEdit)
    }
    utilService.saveToStorage(NOTES_KEY, gNotes)
}

function addNote(note) {
    let newNote = createNote(note.type, note.content)
    gNotes.unshift(newNote)
    utilService.saveToStorage(NOTES_KEY, gNotes)
}

function removeNote(id) {
    let index = gNotes.findIndex(note => note.id === id)
    gNotes.splice(index, 1)
    utilService.saveToStorage(NOTES_KEY, gNotes)
}

function duplicateNote(note){
    let {type, content, color, pinned} = note
    let newNote = createNote(type, content, color, pinned)
    gNotes.unshift(newNote)
    utilService.saveToStorage(NOTES_KEY, gNotes)
}

function queryNote(id) {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    let index = notes.findIndex(note => note.id === id)
    return notes[index]
}

function queryNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes) {
        notes = [createNote('imageNote', {url: 'https://kids.nationalgeographic.com/content/dam/kids/photos/articles/Nature/H-P/Habitats/Ocean/wave.ngsversion.1500050062134.adapt.710.1.jpg', text:'Vision'}), createNote('textNote', 'Andy Barefoot wrote up a great guide. The trick is setting up repeating grid rows that are fairly short, letting the elements fall into the grid horizontally as they may, then adjusting their heights to match the grid with some fairly light math to calculate how many rows they should span.'), createNote('listNote', [{ line: 'Finish this project', state: true }, { line: 'Move On', state: false }]),createNote('textNote', 'Without music, life would be a mistake.'), createNote('videoNote', 'https://www.youtube.com/embed/kI_069CAVCI'), createNote('textNote', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur, vitae lacinia enim auctor. Aenean vitae fermentum odio.'), createNote('listNote', [{ line: 'Mango', state: false }, { line: 'Bannana', state: false }, { line: 'Melon', state: false }]), createNote('textNote', 'lorem ipsum'), createNote('videoNote', 'https://www.youtube.com/embed/kI_069CAVCI')]
    }
    gNotes = notes
    utilService.saveToStorage(NOTES_KEY, gNotes)
    return gNotes
}
