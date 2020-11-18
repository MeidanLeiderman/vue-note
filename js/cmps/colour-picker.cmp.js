'use strict'

export default {
    template: `
                <section class="color-palette-container" @click.stop>
                    <div class="colors-tab-container">
                        <div v-for="(color, index) in colorChoices" :key="index" :color="color[index]" @click.stop="setColor(colorChoices[index])" class="color-tab" :ref="colorChoices[index]" :style="{'background-color':colorChoices[index]}"></div>
                    </div>
                </section>
`,
    data() {
        return {
            color: null,
            colorChoices:['#F28B82','#E6C9A8','#FBBC04','#A7FFEB','#AECBFA','#D7AEFB','#CBF0F8','#CCFF90','#FDCFE8','white']
        }
    },
    created(){
    },
    methods: {
        setColor(color){
            this.$emit('changeColor', color)
        }
    },
    computed:{
        
    }
} 