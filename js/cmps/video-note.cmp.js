'use strict'


import noteService from '../services/note-service.js'

export default {
    name: 'videoNote',
    props: { note: Object },
    template: `
            <section class="video-note-container">
                <iframe width="220" height="100" :src="note.content">
                </iframe>
                <note-toolbar @removeNote="removeNote"/>
            </section>
        `,
    methods: {
        removeNote() {
            noteService.removeNote(this.note.id)
        }
    }
}