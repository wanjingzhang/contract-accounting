import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/main.css";
import ElementUI from "element-ui";

// 不在终端里显示vue的提示消息
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
