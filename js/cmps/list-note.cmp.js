'use strict';

import noteService from '../services/note-service.js'

export default {
    name: 'listNote',
    props: {
        note: Object,
        toEdit: Boolean
    },
    template: `
    <section v-if="note" class="note-container" :style="{'background-color': noteToEdit.color}" @mouseover="isHover=true" @mouseleave="isHover=false">
        <div class="list-line-container" v-for="(line, index) in noteToEdit.content" :key="index" >
            <input type="checkbox" class="regular-checkbox" :checked="line.state" v-model="noteToEdit.content[index].state" @change="saveNote" @click.stop>
            <div class="line" :contenteditable="toEdit" :ref="'line' + index" @focusout="save($event, index)" @keyup="checkShowAddLine($event, index)" :style="line.state && isCrossedOver" v-html="line.line"></div>
            <i class="fas fa-times" @click.stop="removeLine(index)" title="remove line"></i>
        </div>
        <hr v-if="toEdit && showAddLine">
        <div v-if="toEdit && showAddLine" class="temp-line" :contenteditable="true" @click="addLine(); lineFocused();">Add an item</div>
        <hr v-if="toEdit && showAddLine">
        <note-toolbar :class="toggleEditor" :toEdit="toEdit" @saveNote="completeEdits" @removeNote="removeNote" @changeBackgroundColor="changeBackgroundColor" @pinNote="setPinStatus"/>
    </section>
`,
    created(){
        this.noteToEdit = JSON.parse(JSON.stringify(this.note));
    },
    data(){
        return {
            noteToEdit:{},
            showAddLine: true,
            isHover: false,
            editComplete: false
        }
    },
    computed:{
        isCrossedOver(){
            return 'text-decoration: line-through'
        },
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
                if (!this.noteToEdit.id && this.noteToEdit.content.every(line=>!line.line)) this.$emit('note-edit')
                if (this.toEdit && this.editComplete) this.$emit('note-edit', this.noteToEdit, true)
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
        removeLine(index){
            this.noteToEdit.content.splice(index, 1)
            this.saveNote()
        },
        addLine(){
            this.noteToEdit.content.push({line:'', state: false})
        },
        save(e, index){
            if(this.toEdit){
                this.noteToEdit.content[index].line = e.target.textContent
            }
        },
        async lineFocused() {
            await this.$nextTick()
            this.$refs[`line${this.noteToEdit.content.length - 1}`][0].focus()
            this.showAddLine = false
        },
        checkShowAddLine(e, index) {
            this.showAddLine =
                index === this.noteToEdit.content.length - 1 &&
                e.target.textContent !== ''
        },
        changeBackgroundColor(color) {
            this.noteToEdit.color = color
            this.$forceUpdate();
            if(!this.noteToEdit.id) return
            this.saveNote();
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
    }
}