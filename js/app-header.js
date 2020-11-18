'use strict'

import noteFilter from './cmps/note-filter.cmp.js'

export default {
    name: 'appHeader',
    template: `
    <section class="app-header">
        <h3 class="logo" v-if="!searchBar">Keep</h3>
        <note-filter :class="displaySearch" >
            <input class="search-box" type="text" @input="searchEvent" placeholder="Search" v-model="searchTerm" />
        </note-filter>
        <nav class="navbar" :class="isOpen">
            <router-link @click.native="toggleMenu" to="/">Main</router-link>
            <router-link @click.native="toggleMenu" to="/about">About</router-link>
        </nav>
        <i class="fas fa-bars fa-lg menu-btn" @click="toggleMenu" v-if="!searchBar"></i>
        <i class="fas fa-search fa-lg search-btn" @click="openSearch"" v-if="!searchBar"></i>
        <i class="fas fa-arrow-left fa-lg back-btn" @click="closeSearch" v-if="searchBar"></i>
    </section>
    `,
    components: {
        noteFilter
    },
    
    data(){
        return{
            isMenu: false,
            searchBar: false,
            searchTerm:''
        }
    },
    computed:{
        isOpen(){
            if(this.isMenu) return 'navbar-open'
        },
        displaySearch(){
            if(this.searchBar) return 'open'
        }
    },
    methods:{
        toggleMenu(){
            this.isMenu = !this.isMenu
        },
        openSearch(){
            this.searchBar = true
        },
        closeSearch(){
            this.searchBar = false
            this.searchTerm=''
            if (this.$route.path !== '/') this.$router.push('/')
        },
        async searchEvent() {
            await this.$nextTick()
            if(this.searchTerm.length>2) this.$router.push({path:'search', query: {q: this.searchTerm}})
            if(this.searchTerm.length<3 && this.$route.path !== '/') this.$router.push('/')
        }
    }
}