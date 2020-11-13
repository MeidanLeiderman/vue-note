'use strict'

import noteApp from './cmps/note-app.cmp.js'
import aboutPage from './about.cmp.js'


const routes =[
    {   
        path:'/',
        component: noteApp
    },
    {
        path:'/search',
        component: noteApp,
        props: route => ({query: route.query.q})
    },
    {   
        path:'/about',
        component: aboutPage
    }
]

const theRouter = new VueRouter({routes})

export default theRouter