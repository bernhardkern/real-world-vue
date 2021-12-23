import {createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const GStore = reactive({flashMessage: ''})

createApp(App).use(router).provide('GStore', GStore).mount('#app')
