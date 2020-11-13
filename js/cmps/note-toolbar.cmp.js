'use strict'

import colourPicker from './colour-picker.cmp.js'
// a global component without need of importing directly
Vue.component('noteToolbar', {
    props: {
        toEdit: Boolean
    },
    template: `
        <section class="note-toolbar-container flex row">
            <i class="fas fa-palette fa-lg" @mouseover="chooseColor=true" @mouseleave="chooseColor=false" @click.stop="openPalette"></i>
            <i class="fas fa-thumbtack fa-lg" title="pin this note" @click.stop="$emit('pinNote')"></i>
            <i class="fas fa-trash-alt fa-lg" title="remove this note" @click.stop="$emit('removeNote')"></i>
            <colour-picker @changeColor="changeBackgroundColor" @mouseenter.native="chooseColor=true" @mouseleave.native="chooseColor=false" v-if="chooseColor"/>
            <span v-show="toEdit" @click.stop="$emit('saveNote')">Finish</span>
        </section>
    `,
    created(){
    },
    components:{
        colourPicker
    },
    data(){
        return {
            chooseColor: false,
        }
    },
    methods:{
        openPalette() {
            this.chooseColor = !this.chooseColor
        },
        changeBackgroundColor(color) {
            this.$emit('changeBackgroundColor', color)
        },
    }

})