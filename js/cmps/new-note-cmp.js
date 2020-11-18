'use strict'

import noteEdit from './note-edit.cmp.js'


export default {
    name: 'newNoteForm',
    template: ` <section class="note-form-container">
                    <input type="file" ref="file" hidden @change="uploadFile">
                    <div class="input-box" @click="setSelectedNote"></div>
                    <div class="button-container">
                        <i class="fas fa-images fa-lg" @click="openFileUpload" title="add an image"></i>
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
        },
        setImageNote(image){
            this.note = {type: 'imageNote', content: {text:'', url: image}}
            this.$emit('setSelectedNote', this.note)
        },
        openFileUpload(){
            this.$refs.file.click()
        },
        uploadFile(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file){
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                image = e.target.result;
                // console.log(e.target.result)
                this.setImageNote(e.target.result)
            };
            reader.readAsDataURL(file);
            // console.log(image)
        }
    },
    components: {
        noteEdit
    } 

}