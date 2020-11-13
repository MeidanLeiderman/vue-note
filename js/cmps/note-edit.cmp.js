'use strict'
// import listForm from './new-note-list-form.cmp.js'
import listNote from './list-note.cmp.js'
import textNote from './text-note.cmp.js'
import videoNote from './video-note.cmp.js'

import noteService from '../services/note-service.js'

export default {
    name: 'noteEdit',
    props: {
        note: Object
    },
    template: ` <section class="note-edit-container">
                    <component :is="note.type" :note="note" :toEdit="true" @note-edit="saveNote"/>
                </section>`,
    data() {
        return {
            componentKey: 0,
        }
    },
    components:{
        listNote,
        textNote,
        videoNote
    },
    methods: {
        saveNote(noteToEdit, state) {
            // console.log(noteToEdit, state)
            if (noteToEdit){
                if (state){
                    this.$emit('completedEdits')
                }
                noteService.editNote(noteToEdit)
                this.componentKey+=1
            }
            else this.$emit('completedEdits')
            // if (!noteToEdit) return
            // noteService.editNote(noteToEdit)
        },
    },
}