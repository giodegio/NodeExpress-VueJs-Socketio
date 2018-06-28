// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import store from './vuex-store';
import VueSocketio from 'vue-socket.io-extended';

import io from 'socket.io-client'; // Socket.io client

export const SocketInstance = io();

// -------------------------------------------------
// Caution: for vue-socket.io-extended, the third parameter is an object!!!
// -------------------------------------------------
Vue.use(VueSocketio, SocketInstance, {store});

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
