'use strict'

import noteService from '../services/note-service.js'
import typeFilter from './type-filter.cmp.js'
import noteList from './note-list-cmp.js'
import newNoteForm from './new-note-cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
    name: 'noteApp',
    template: `
        <section class="note-app-container">
            <type-filter @filterByType="setType"/>
            <new-note-form v-if="!isCurrentNote" @setSelectedNote="createNewNote"/>
            <note-edit v-else :note="currentNote" @completedEdits="setSelectedNote"/>
            <note-list :notes="showNotesByFilter" @noteToEdit="setSelectedNote"/>
        </section>
`,
    components: {
        typeFilter,
        noteList,
        noteEdit,
        newNoteForm
    },
    created(){
        this.notes = noteService.queryNotes()
    },
    data(){
        return{
            notes:[],
            currentNote:{},
            filterBy:{q:'', noteType: null}
        }
    },
    computed:{
        isCurrentNote(){
            if(Object.keys(this.currentNote).length===0) return false
            else return true
        },
        showNotesByFilter(){
            let {q, noteType} = this.filterBy
            if (!q && !noteType) return this.notes
            else {
                return this.notes.filter(note => {
                    let { content, type } = note;
                    //have to deal with all data structures (content=object/array/string)
                    if(Array.isArray(content)) content = content.map(line=>line.line).join('-----');
                    if (type==='imageNote') {
                        content = content.text
                    }
                    if(noteType) {
                        var wordFilter = '' ? true : content.toLowerCase().includes(this.filterBy.q.toLowerCase()) && noteType===type
                    }
                    else if(!this.filterBy.type) {
                        var wordFilter = '' ? true : content.toLowerCase().includes(this.filterBy.q.toLowerCase())
                    }
                    return wordFilter
                })
            }
        }
    },
    methods: {
        setSelectedNote(id){
            if(!id) {
                this.currentNote={}
            } else {
                let index = this.notes.findIndex(note=>note.id===id)
                this.currentNote = this.notes[index]
            }
            
        },
        createNewNote(note){
            this.currentNote = note
        },
        setType(type){
            this.filterBy.noteType = type
        },
        scrollToTop(){
            window.scrollTo(0,0)
        }
    },
    watch: {
       '$route'(to, from){
            this.filterBy.q = this.$route.query.q
       }
    }

}