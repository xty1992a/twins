// 未编译API,需要引入polyfill
import 'core-js'
import App from './App.vue'
import Vue from 'vue'
import './styles/index.less'
import store from './store/index.js'

let vm = new Vue({
  store,
  render: h => h(App)
}).$mount();

document.body.appendChild(vm.$el)

