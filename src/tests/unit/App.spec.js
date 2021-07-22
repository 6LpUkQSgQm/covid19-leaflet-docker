import Vue from "vue";
import Vuetify from "vuetify";
import App from "../../App";
import { createLocalVue, mount } from "@vue/test-utils";
import store from "@/store/index.js";

describe("1. App.vue", () => {
  const localVue = createLocalVue();
  
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("2. should have a v-app", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store
    });
    expect(wrapper.find(".v-app"));
  });
  it("3. theme", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store
    });
    expect(wrapper.find(".v-app"));
  });
});
