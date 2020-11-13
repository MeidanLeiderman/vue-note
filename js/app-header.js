'use strict'

import noteFilter from './cmps/note-filter.cmp.js'

export default {
    name: 'appHeader',
    template: `
    <section class="app-header">
        <h3 class="logo" v-if="!searchBar">Keep</h3>
        <note-filter :class="displaySearch" />
        <i class="fas fa-bars fa-lg menu-btn" @click="toggleMenu" v-if="!searchBar"></i>
        <nav class="navbar" :class="isOpen">
            <router-link to="/">Main</router-link>
            <router-link to="/about">About</router-link>
        </nav>
        <i class="fas fa-search fa-lg search-btn" @click="toggleSearchBar" v-if="!searchBar"></i>
        <i class="fas fa-arrow-left fa-lg back-btn" @click="toggleSearchBar" v-if="searchBar"></i>
    </section>
    `,
    components: {
        noteFilter
    },
    
    data(){
        return{
            isMenu: false,
            searchBar: false
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
        toggleSearchBar(){
            this.searchBar = !this.searchBar
        }
    }
}