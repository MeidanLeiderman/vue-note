'use strict'

import VueMasonry from '../../lib/masonry.cmp.js'

import listNote from './list-note.cmp.js'
import textNote from './text-note.cmp.js'
import videoNote from './video-note.cmp.js'
import imageNote from './img-note.cmp.js'
import './note-toolbar.cmp.js'
import noteService from '../services/note-service.js'

export default {
    name: 'noteList',
    props: {
        notes: Array
    },
    template: `
        <section class="note-list-container">
            <section class="pinned-notes-section">
                <h4 v-if="isPinned">Pinned Notes</h4>
                <div class="pinned-notes-container">
                    <masonry :cols="{default: 4, 1000: 3, 768: 2}" :gutter="10">
                        <component :is="note.type" v-for="note in pinnedNotes" :key="note.id" :note="note" :toEdit="false" class="note-container" @click.native="setSelectedNote(note.id)" @note-edit="saveEditedNote"/>
                    </masonry>
                </div>
            </section>
            <section class="unpinned-notes-section">
                <h4 v-if="isPinned">Other Notes</h4>
                <div class="unpinned-notes-container">
                    <masonry :cols="{default: 4, 1000: 3, 768: 2}" :gutter="10">
                        <component :is="note.type" v-for="note in unPinnedNotes" :key="note.id" :note="note" :toEdit="false" class="note-container" @click.native="setSelectedNote(note.id)" @note-edit="saveEditedNote"/>
                    </masonry>
                </div>
            </section>
        </section>
`,  components: {
        listNote,
        textNote,
        videoNote,
        imageNote
    },
    data(){
        return{
            isPinned: false
        }
    },
    computed:{
        pinnedNotes(){
            const pinned = this.notes.filter(note=>note.pinned)
            if (pinned.length) this.isPinned = true
            else this.isPinned = false
            return pinned
        },
        unPinnedNotes() {
            return this.notes.filter(note => !note.pinned)
        },
    },
    methods:{
        setSelectedNote(id){
            this.$emit('noteToEdit', id)
        },
        saveEditedNote(note){
            noteService.editNote(note)
        }
    },

}