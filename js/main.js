'use strict'

import theRouter from './router.js'
import appHeader from './app-header.js'
import '../lib/vue-touch-events.js'

import VueYouTubeEmbed from '../lib/vue-youtube-embed.js'

Vue.use(VueYouTubeEmbed)




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
        appHeader,
    }
}

new Vue (keepApp)
