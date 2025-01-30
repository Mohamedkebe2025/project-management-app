import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// Add response interceptor for error handling
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

const vuetify = createVuetify()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.config.globalProperties.$axios = axios
app.mount('#app')
