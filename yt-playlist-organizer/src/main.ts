import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import axios from 'axios';
import GAuth from './plugins/gAuth.js'

import './index.css'

// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://localhost:5001/';

const app = createApp(App)
app.use(store)

const gAuthOptions = { 
    clientId: '388838755801-kfnpmrb9a3q8b5927li8ojahegorq2pd.apps.googleusercontent.com', 
    scope: 'https://www.googleapis.com/auth/youtube', 
    prompt: 'consent', 
    fetch_basic_profile: true
}
app.use(GAuth, gAuthOptions)

app.mount('#app')
