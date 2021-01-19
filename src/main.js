import Vue from 'vue'
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import App from './App.vue'
import AboutPage from "./AboutPage";

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/about',
      component: AboutPage
    },
    {
      path: '/mylist',
      component: App
    }
  ]
});

new Vue({
  router,
  template: `
    <div>
      <nav>
        <div>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/mylist">My List</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
        </div>
      </nav>
      <router-view class="view"></router-view>
    </div>
  `
  //render: h => h(App),
}).$mount('#app');
