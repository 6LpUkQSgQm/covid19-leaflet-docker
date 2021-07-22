import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import ChartSummaryCountry from "../../components/dashboard/ChartSummaryCountry.vue";
import { createLocalVue, mount } from "@vue/test-utils";
import store from "../../store/index.js";

describe("ChartSummaryCountry.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  let vuetify;
  const vuetifyOptions = {};
  Vue.use(Vuetify);
  new Vue({
    vuetify: new Vuetify(vuetifyOptions),
  });
  beforeEach(() => {
    vuetify = new Vuetify();
    new Vuex.Store({ store });
  });
  it("Find components", () => {
    const wrapper = mount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    const summaryCountry = wrapper.findComponent({
      name: "ChartSummaryCountry",
    });
    expect(summaryCountry.exists()).toBe(true);
  });
  it("getters: getCountry", () => {
    const actual = store._wrappedGetters.getCountry(store.state);
    expect(actual).toEqual("France");
  });
  it("getters: getDataChart", () => {
    const actual = store._wrappedGetters.getDataChart(store.state);
    expect(actual).toEqual([]);
  });
  it("renders button: 6 month", async () => {
    const wrapper = mount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    expect(wrapper.find("#one_week").text()).toBe("1W");
    expect(wrapper.find("#one_month").text()).toBe("1M");
    expect(wrapper.find("#six_months").text()).toBe("6M");
    expect(wrapper.find("#one_year").text()).toBe("1Y");
  });
  it("watch: intial theme light", () => {
    const wrapper = mount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    const actualLight = store._wrappedGetters.theme(store.state);
    expect(actualLight).toEqual("light");
  });
  it("function: initial state + updateChartTheme()", async () => {
    const wrapper = mount(ChartSummaryCountry, {
      store,
      localVue,
      vuetify,
    });
    const actualColors = wrapper.vm.chartOptions.colors;
    expect(actualColors).toEqual(["#e48900", "#be0000", "#9ede73"]);
  });
});
