'use strict'

import noteService from '../services/note-service.js'

export default {
    name: 'textNote',
    props: { note: Object,
            toEdit: Boolean
    },
    template: `
            <section class="note-container flex column space-between" :style="{'background-color': noteToEdit.color || 'white'}" @mouseenter.prevent="isHover=true" @mouseleave="isHover=false">
                <div class="text" :contenteditable="toEdit" @focusout="save($event)" ref="text">{{noteToEdit.content}}</div>
                <note-toolbar :class="toggleEditor" :toEdit="toEdit" @saveNote="completeEdits" @removeNote="removeNote" @changeBackgroundColor="changeBackgroundColor" @pinNote="setPinStatus" @duplicate="duplicateNote"/>
            </section>
    `,
    created(){
        this.noteToEdit = JSON.parse(JSON.stringify(this.note));
    },
    data(){
        return {
            noteToEdit:{},
            isHover: false,
            editComplete: false
        }
    },
    computed:{
        toggleEditor(){
            if (this.isHover || this.toEdit) return 'visible'
            else return 'invisible'
        }
    },
    methods: {
        completeEdits(){
            this.editComplete=true
            this.saveNote()
        },
        saveNote(){
            if(!this.toEdit) this.$emit('note-edit', this.noteToEdit, true)
            else{
                if (!this.noteToEdit.id && !this.noteToEdit.content) this.$emit('note-edit')
                else if (!this.editComplete) this.$emit('note-edit', this.noteToEdit, false)
                else if (this.editComplete) this.$emit('note-edit',this.noteToEdit, true)
            }
        },
        save(e){
            if(this.toEdit){
                this.noteToEdit.content = e.target.textContent
                e.target.textContent = this.noteToEdit.content
                if(!this.noteToEdit.id) return
                this.saveNote()
            }
        },
        removeNote() {
            if(this.toEdit){
                if (this.noteToEdit.id){
                    noteService.removeNote(this.noteToEdit.id)
                }
                this.$emit('note-edit')
            }
            else noteService.removeNote(this.noteToEdit.id)

        },
        duplicateNote(){
            noteService.duplicateNote(this.noteToEdit)
        },
        changeBackgroundColor(color) {
            this.noteToEdit.color=color
            this.$forceUpdate();
            if(!this.noteToEdit.id) return
            this.saveNote()
        },
        setPinStatus(){
            this.noteToEdit.pinned = !this.noteToEdit.pinned
            if(!this.noteToEdit.id) return
            this.saveNote()
        },
    },
    watch:{
        note:{
            deep: true,
            handler(){
                this.noteToEdit = JSON.parse(JSON.stringify(this.note));
            }
       }
    },
}