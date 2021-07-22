import Vue from "vue";
import Vuetify from "vuetify";
import Autocomplete from "../../components/navigation/Autocomplete.vue";
import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import store from "../../store/index";
import dashboard from "@/store/modules/dashboard.js";
import axios from "axios";

describe("Autocomplete.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let wrapper;
  Vue.use(Vuetify);
  beforeEach(async () => {
    vuetify = new Vuetify();
    jest.useFakeTimers();
  });
  afterEach(() => {
    wrapper.destroy();
  });
  it("1.Find component", () => {
    wrapper = mount(Autocomplete, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.findComponent({ name: "Autocomplete" }).exists()).toBe(true);
  });
  it("2.Find autocomplete input", () => {
    wrapper = mount(Autocomplete, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.find(".v-autocomplete").exists()).toBe(true);
  });
  it("3.Find autocomplete input", () => {
    wrapper = mount(Autocomplete, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.find(".v-autocomplete").exists()).toBe(true);
  });
  it("4. action countries", async () => {
    const response = await axios.get(process.env.VUE_APP_API_COUNTRIES);
    const commit = jest.fn();
    const countries = response.data;
    await dashboard.actions.countries({ commit }, countries);
    expect(commit).toHaveBeenCalledWith("SET_COUNTRIES", response.data);
  });
  it("5. getter getCountries", async () => {
    const response = await axios.get(process.env.VUE_APP_API_COUNTRIES);
    const state = {
      countries: response.data,
    };
    const actual = dashboard.getters.getCountries(state);
    expect(actual).toStrictEqual(response.data);
  });
  it("6. data", async () => {
    wrapper = shallowMount(Autocomplete, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.vm.items).toStrictEqual([]);
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.search).toStrictEqual(null);
    expect(wrapper.vm.select).toStrictEqual(null);
    wrapper.setData({ items: ["France"] });
    wrapper.setData({ loading: true });
    wrapper.setData({ search: "Fra" });
    wrapper.setData({ select: "France" });
    expect(wrapper.vm.items[0]).toStrictEqual("France");
    expect(wrapper.vm.loading).toBe(true);
    expect(wrapper.vm.search).toStrictEqual("Fra");
    expect(wrapper.vm.select).toStrictEqual("France");
  });
  it("6. function", async () => {
    wrapper = mount(Autocomplete, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.vm.loading).toBe(false);
    wrapper.vm.$options.watch.search.call(wrapper.vm, "France");
    expect(wrapper.vm.loading).toBe(true);
    expect(wrapper.vm.items).toStrictEqual([]);
    wrapper.vm.$store.commit("SET_COUNTRIES", [
      { Country: "France" },
      { Country: "Sweden" },
    ]);

    jest.advanceTimersByTime(2000);
    expect(wrapper.vm.loading).toBe(false);
    //expect(wrapper.vm.items).toStrictEqual("");
  });
});
