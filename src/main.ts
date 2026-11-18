import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'
import axiosPlugin from './plugins/axios'
import './assets/main.css'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axiosPlugin)
app.use(VueApexCharts)

app.mount('#app')
