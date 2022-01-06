import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const options = {
  maxToasts: 3,
  newestOnTop: true,
  position: "bottom-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  pauseOnHover: false,
  draggable: false,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}


const app = createApp(App)

app.use(createPinia())
  .use(router)
  .use(Toast, options)
  .mount('#app')
