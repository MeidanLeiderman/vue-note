'use strict'

import theRouter from './router.js'
import appHeader from './app-header.js'
import '../lib/vue-touch-events.js'



let keepApp ={
    router: theRouter,
    el: '.keep-app',
    template: `
    <section class="container">
        <app-header/>
        <router-view></router-view>
    </section>
    `,
    components: {
        appHeader
    }
}

new Vue (keepApp)