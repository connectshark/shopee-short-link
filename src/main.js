import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import './assets/css/reset.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const options = {
  maxToasts: 5,
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



createApp(App)
  .use(router)
  .use(store)
  .use(Toast, options)
  .mount('#app')