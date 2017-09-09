import Vue from 'vue'
import VueRouter from 'vue-router';
// import VueResource from 'vue-resource';
import store from './store';
import App from './App.vue';
import routes from './route/router'
import Filter from 'Utils/filter'
import 'Utils/adaptive'
import toast from 'Components/Toast/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// 样式入口
import './styles/index.less'

import {
  setTitle
} from 'Utils/index';

Vue.prototype.$toast = toast;
Vue.use(ElementUI);
// Vue.use(VueResource);

[VueRouter].forEach(plugin => Vue.use(plugin));

Object.keys(Filter).forEach(function (k) {
  Vue.filter(k, Filter[k]);
});

const router = new VueRouter({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  next();
  if (to.meta.title) {
    setTitle(to.meta.title);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
