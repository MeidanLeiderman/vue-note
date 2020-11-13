'use strict'
export default {
    name: 'noteFilter',
    template: `
    <section class="search-filter">
        <i class="fas fa-search"></i>
        <input class="search-box" type="text" @input="searchEvent" placeholder="Search" v-model="searchTerm" />
    </section>
    `,
    data() {
        return {
            searchTerm: '',
        }
    },
     methods: {
        async searchEvent() {
            await this.$nextTick()
            if(this.searchTerm.length>2) this.$router.push({path:'search', query: {q: this.searchTerm}})
            if(this.searchTerm.length<3 && this.$route.path !== '/') this.$router.push('/')
        }
    }
}