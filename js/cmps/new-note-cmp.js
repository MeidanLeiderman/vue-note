'use strict'

import noteEdit from './note-edit.cmp.js'


export default {
    name: 'newNoteForm',
    template: ` <section class="note-form-container">
                    <div class="input-box" @click="setSelectedNote"></div>
                    <div class="button-container">
                        <i class="fas fa-images fa-lg" @click="note.type='imageNote'" title="add an image"></i>
                        <i class="fas fa-clipboard-list fa-lg" @click="setListNote" title="add a list"></i>
                        <i class="fas fa-font fa-lg" @click="setTextNote" title="add a text"></i>
                        <i class="fab fa-youtube fa-lg" @click="setVideoNote" title="add an embedded YouTube link"></i>
                    </div>
                </section>`,
    data() {
        return {
            note: {
                type: 'textNote',
                content: ''
            },
            isSelected: false
        }
    },

    methods: {
        setListNote(){
            this.note = {type: 'listNote', content:[], color: 'white'}
            this.setSelectedNote()
        },
        setVideoNote(){
            this.note = {type: 'videoNote', content:''}
            this.setSelectedNote()
        },
        setTextNote(){
            this.note = {type:'textNote', content:'', color: 'white'}
            this.setSelectedNote()
        },
        setSelectedNote(){
            this.$emit('setSelectedNote', this.note)
            this.note = {type:'textNote', content:''}
        }
    },
    components: {
        noteEdit
    } 

}