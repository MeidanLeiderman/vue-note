'use strict'
import listNote from './list-note.cmp.js'
import textNote from './text-note.cmp.js'
import videoNote from './video-note.cmp.js'
import imageNote from './img-note.cmp.js'

import noteService from '../services/note-service.js'

export default {
    name: 'noteEdit',
    props: {
        note: Object
    },
    template: ` <section class="note-edit-container">
                    <div class="screen" @click="$emit('completedEdits')"></div>
                    <div class="editor-wrapper">
                        <component :is="note.type" :note="note" :toEdit="true" @note-edit="saveNote"/>
                    </div>
                </section>`,
    components:{
        listNote,
        textNote,
        videoNote,
        imageNote
    },
    created(){
        this.scrollToTop()
    },
    methods: {
        saveNote(noteToEdit, state) {
            if (noteToEdit){
                if (state){
                    this.$emit('completedEdits')
                }
                noteService.editNote(noteToEdit)
            }
            else this.$emit('completedEdits')
        },
        scrollToTop(){
            window.scrollTo(0,0)
        }
    },
}