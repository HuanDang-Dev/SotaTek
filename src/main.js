import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import BaseButton from "../src/components/base/BaseButton.vue";
import BaseInput from "../src/components/base/BaseInput.vue";

export default {
  components: {
    BaseButton,
    BaseInput,
  },
};

createApp(App).use(router).mount("#app");
