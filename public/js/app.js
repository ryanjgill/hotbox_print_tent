Vue.use(VueApexCharts);
Vue.component('apexchart', VueApexCharts);

new window.Vue({
  el: '#app',
  components: {
    'app-home': window.httpVueLoader('/js/components/AppHome.vue')
  },
})