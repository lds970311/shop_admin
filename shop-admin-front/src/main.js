// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import less from 'less'
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import echarts from 'echarts';
//引入公共样式
import './assets/common.css'

axios.defaults.baseURL = "http://192.168.1.123:19788/api/private/v1";
//配置请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem("token");
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(less)
//富文本编辑器
Vue.use(VueQuillEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
