import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './permission'
import '@/icons'
import '@/styles/index.scss'
import i18n from '@/components/i18n'

import { Message, Select, Option, DatePicker, Button, Upload} from 'element-ui';
Vue.prototype.$message = Message;
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Upload)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
