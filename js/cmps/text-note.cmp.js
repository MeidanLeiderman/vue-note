'use strict'

import noteService from '../services/note-service.js'

export default {
    name: 'textNote',
    props: { note: Object,
            toEdit: Boolean
    },
    template: `
            <section class="note-container flex column space-between" :style="{'background-color': noteToEdit.color}" @mouseover="isHover=true" @mouseleave="isHover=false">
                <div class="text" :contenteditable="toEdit" @focusout="save($event)" ref="text">{{noteToEdit.content}}</div>
                <note-toolbar :class="toggleEditor" :toEdit="toEdit" @saveNote="completeEdits" @removeNote="removeNote" @changeBackgroundColor="changeBackgroundColor" @pinNote="setPinStatus"/>
            </section>
    `,
    created(){
        this.noteToEdit = JSON.parse(JSON.stringify(this.note));
        // console.log(this.noteToEdit)
    },
    mounted(){
        if(this.toEdit) this.$refs.text.focus()
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
                // do not save empty notes
                if (!this.noteToEdit.id && !this.noteToEdit.content) this.$emit('note-edit')
                else if (this.toEdit && this.editComplete) this.$emit('note-edit', this.noteToEdit, true)
            }
        },
        save(e){
            if(this.toEdit){
                this.noteToEdit.content = e.target.textContent
                e.target.textContent = this.noteToEdit.content
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
        }
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