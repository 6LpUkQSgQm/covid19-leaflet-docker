import Vue from "vue";
import Vuetify from "vuetify";
import DarkModeButton from "../../components/navigation/DarkModeButton.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import dashboard from "@/store/modules/dashboard.js"
import store from '../../store/index'

describe("DarkModeButton.vue", () => {
  const localVue = createLocalVue()
  let vuetify;
  let wrapper;
  Vue.use(Vuetify);
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  afterEach(() => {
    wrapper.destroy()
  })
  it("1.Find component", () => {
      wrapper = mount(DarkModeButton, {
      localVue,
      vuetify
    });
    expect(wrapper.findComponent({ name: "DarkModeButton" }).exists()).toBe(true);
  });
  it("2.Theme light by default", () => {
    wrapper = mount(DarkModeButton, {
      localVue,
      vuetify,
    });
    expect(wrapper.find('.mdi-moon-waxing-crescent').exists()).toBe(true)
  });
  it("3.function", () => {
    wrapper = mount(DarkModeButton, {
      localVue,
      vuetify,
      store
    }); 
    const commit = jest.fn()
    const button = wrapper.find('.v-btn')
    expect(button.exists()).toBe(true)
    button.vm.$emit('click')
    wrapper.vm.$nextTick()
    dashboard.actions.updateTheme({ commit }, 'dark')
    expect(commit).toHaveBeenCalledWith(
      "theme", 'dark')
  })
});