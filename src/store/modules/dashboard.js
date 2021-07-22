import axios from "axios";
const state = {
  summaryGlobal: {},
  dateSummaryGlobal: "",
  summaryCountry: {},
  country: "France",
  countries: [],
  countryLatLng: {},
  currentDate: new Date(),
  dataChart: [],
  errorData: false,
  loadingSummary: false,
  loadingMap: true,
  loadingChart: false,
  loadingSummaryWorld: true,
  theme: "light",
};
const getters = {
  getSummaryGlobal: (state) => {
    return state.summaryGlobal;
  },
  getDateSummaryGlobal: (state) => {
    return state.dateSummaryGlobal;
  },
  getSummaryCountry: (state) => {
    return state.summaryCountry;
  },
  getCountry: (state) => {
    return state.country;
  },
  getCountries: (state) => {
    return state.countries;
  },
  getCountryLatLng: (state) => {
    return state.countryLatLng;
  },
  getDataChart: (state) => {
    return state.dataChart;
  },
  getErrorData: (state) => {
    return state.errorData;
  },
  getLoadingSummary: (state) => {
    return state.loadingSummary;
  },
  getLoadingMap: (state) => {
    return state.loadingMap;
  },
  getLoadingChart: (state) => {
    return state.loadingChart;
  },
  getLoadingSummaryWorld: (state) => {
    return state.loadingSummaryWorld;
  },
  theme: (state) => state.theme,
};
const mutations = {
  SET_COUNTRY(state, country) {
    state.country = country;
  },
  SET_COUNTRY_LAT_LNG(state, countryLatLng) {
    state.countryLatLng = countryLatLng;
  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_SUMMARY_GLOBAL(state, response) {
    state.summaryGlobal = response.data.Global;
  },
  SET_DATE_SUMMARY_GLOBAL(state, response) {
    state.dateSummaryGlobal = response.data.Date;
  },
  SET_DATA_CHART(state, response) {
    state.dataChart = response;
  },
  SET_ERROR_DATA(state, errorData) {
    state.errorData = errorData;
  },
  SET_LOADING_SUMMARY(state, loadingSummary) {
    state.loadingSummary = loadingSummary;
  },
  SET_LOADING_MAP(state, loadingMap) {
    state.loadingMap = loadingMap;
  },
  SET_LOADING_SUMMARY_WORLD(state, loadingSummaryWorld) {
    state.loadingSummaryWorld = loadingSummaryWorld;
  },
  SET_LOADING_CHART(state, loadingChart) {
    state.loadingChart = loadingChart;
  },
  SET_SUMMARY_COUNTRY(state, response) {
    response.data.Countries.map((country) => {
      if (country.Country === state.country) {
        state.summaryCountry = country;
      }
    });
  },
  theme(state, payload) {
    state.theme = payload;
  },
};
const actions = {
  async countries({ commit }) {
    try {
      const response = await axios.get(process.env.VUE_APP_API_COUNTRIES);
      commit("SET_COUNTRIES", response.data);
    } catch (e) {
      console.error(e.message);
    }
  },
  country({ commit }, country) {
    commit("SET_COUNTRY", country);
  },
  async summaryGlobal({ commit }) {
    try {
      const response = await axios.get(process.env.VUE_APP_API_SUMMARY);
      commit("SET_SUMMARY_GLOBAL", response);
      commit("SET_DATE_SUMMARY_GLOBAL", response);
    } catch (e) {
      console.error(e.message);
    }

    commit("SET_LOADING_SUMMARY_WORLD", false);
  },
  async summaryCountry({ commit }) {
    try {
      commit("SET_LOADING_SUMMARY", true);
      const response = await axios.get(process.env.VUE_APP_API_SUMMARY);
      commit("SET_SUMMARY_COUNTRY", response);
      commit("SET_LOADING_SUMMARY", false);
    } catch (e) {
      console.error(e.message);
    }
  },
  async countryLongitudeLatitude({ commit }) {
    try {
      const response = await axios.get(
        process.env.VUE_APP_API_DAYONE + state.country
      );
      commit("SET_COUNTRY_LAT_LNG", response.data[0]);
      commit("SET_ERROR_DATA", false);
    } catch (e) {
      console.error(e.message);
    }
  },
  async updateOptionsChart({ commit }) {
    try {
      const response = await axios.get(
        process.env.VUE_APP_API_TOTAL_COUNTRY +
          state.country +
          "?from=2020-03-01T00:00:00Z&e=" +
          state.currentDate.toJSON()
      );
      commit("SET_ERROR_DATA", false);
      commit("SET_LOADING_MAP", false);
      if (response) {
        commit("SET_DATA_CHART", response.data);
      } else {
        commit("SET_ERROR_DATA", true);
      }
    } catch (e) {
      console.error(e.message);
    }
  },
  updateTheme({ commit }, theme) {
    commit("theme", theme);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
