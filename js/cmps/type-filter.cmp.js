'use strict'

export default{
    name: 'typeFilter',
    template:
        `<section class="type-filter-container">
            <div class="types-wraper"> 
                <span v-for="(type, index) in noteTypes" :key="index" @click="filterByType(type)" :style="type.name===selectedType && isSelected">{{type.value}}</span>
            </div>
        </section>
    `,
    data(){
        return{
            noteTypes:[{value:'All', name: null},{value:'Texts', name: 'textNote'}, {value:'Lists', name: 'listNote'}, {value:'Videos', name: 'videoNote'}, {value:'Images', name: 'imageNote'}],
            selectedType: null
        }
    },
    computed:{
        isSelected(){
            return {'background-color': '#A7D2C0', 'color': 'black'}
        }
    },
    methods:{
        filterByType(type){
            this.selectedType = type.name
            this.$emit('filterByType', this.selectedType)
        }
    }
}