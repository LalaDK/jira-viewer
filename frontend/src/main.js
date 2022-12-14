import { createApp } from "vue";
import App from "./App.vue";
import BootstrapVue3 from "bootstrap-vue-3";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
var Sugar = require("sugar");
Sugar.extend();
const app = createApp(App);
app.use(BootstrapVue3);
app.use(BootstrapIconsPlugin);
app.mount("#app");
