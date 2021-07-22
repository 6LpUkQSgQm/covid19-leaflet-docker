import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";
import SummaryCountry from "@/components/dashboard/SummaryCountry.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import getters from "../../store/modules/dashboard";
import actions from "../../store/modules/dashboard";
import mutations from "../../store/modules/dashboard";

let testGetters = getters.getters;
let testActions = actions.actions;
let testMutations = mutations.mutations;
const country = "Sweden";
const summaryCountry = { test: "test" };
const state = { country, summaryCountry };

let API = "https://api.covid19api.com/summary";
let url = "";

jest.mock("axios", () => ({
  get: (_url) => {
    return new Promise((resolve) => {
      url = _url;
      resolve(true);
    });
  },
}));

describe("SummaryCountry.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  let getters = testGetters;
  let actions = testActions;
  let mutations = testMutations;
  let store = {};
  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations
    });
  });

  it("balise", () => {
    const wrapper = mount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("h3").exists()).toBe(true);
    expect(wrapper.find("p").exists()).toBe(true);
  })
  it("getters: getCountry", () => {
    const wrapper = mount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(
      wrapper
        .find(".country")
        .find("h2")
        .exists()
    ).toBe(true);
    const actual = getters.getCountry(state);
    expect(actual).toEqual("Sweden");
  });
  
  it("getters: getSummaryCountry", () => {
    const wrapper = mount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(
      wrapper
        .find(".country")
        .find("h2")
        .exists()
    ).toBe(true);
    const actual = getters.getSummaryCountry(state);
    expect(actual).toEqual({ test: "test" });
  });
  it("actions: summaryCountry", async () => {
    const commit = jest.fn();
    await actions.summaryCountry({ commit });
    expect(url).toBe(process.env.VUE_APP_API_SUMMARY);
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, "SET_LOADING_SUMMARY", true);
    expect(commit).toHaveBeenNthCalledWith(2, "SET_SUMMARY_COUNTRY", true);
  });
  it("watcher: getCountry", async () => {
    const wrapper = mount(SummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    wrapper.vm.$options.watch.getCountry.call(wrapper.vm, "France");
  })
});
