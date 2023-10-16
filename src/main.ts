import { createApp } from "vue";
import App from "./App.vue";
import { initAppWindowToolBar, mockWindowLoading } from './utils'

// initAppWindowToolBar()

mockWindowLoading()

import TDesign from "tdesign-vue-next";

import "tdesign-vue-next/es/style/index.css";

createApp(App).use(TDesign).mount("#app");
