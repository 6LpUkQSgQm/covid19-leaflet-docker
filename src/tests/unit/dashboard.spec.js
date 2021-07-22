import dashboard from "@/store/modules/dashboard.js";
import axios from "axios";
describe("store/modules/dashboard.js", () => {
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
  };
  it("1. getters", async () => {
    const getSummaryGlobal = dashboard.getters.getSummaryGlobal(state);
    expect(getSummaryGlobal).toStrictEqual({});
    const getDateSummaryGlobal = dashboard.getters.getDateSummaryGlobal(state);
    expect(getDateSummaryGlobal).toStrictEqual("");
    const getSummaryCountry = dashboard.getters.getSummaryCountry(state);
    expect(getSummaryCountry).toStrictEqual({});
    const getCountry = dashboard.getters.getCountry(state);
    expect(getCountry).toStrictEqual("France");
    const getCountries = dashboard.getters.getCountries(state);
    expect(getCountries).toStrictEqual([]);
    const getCountryLatLng = dashboard.getters.getCountryLatLng(state);
    expect(getCountryLatLng).toStrictEqual({});
    const getDataChart = dashboard.getters.getDataChart(state);
    expect(getDataChart).toStrictEqual([]);
    const getErrorData = dashboard.getters.getErrorData(state);
    expect(getErrorData).toStrictEqual(false);
    const getLoadingSummary = dashboard.getters.getLoadingSummary(state);
    expect(getLoadingSummary).toStrictEqual(false);
    const getLoadingMap = dashboard.getters.getLoadingMap(state);
    expect(getLoadingMap).toStrictEqual(true);
    const getLoadingChart = dashboard.getters.getLoadingChart(state);
    expect(getLoadingChart).toStrictEqual(false);
    const getLoadingSummaryWorld = dashboard.getters.getLoadingSummaryWorld(
      state
    );
    expect(getLoadingSummaryWorld).toStrictEqual(true);
  });
  it("2. mutations", async () => {
    const testCountry = "France";
    dashboard.mutations.SET_COUNTRY(state, testCountry);
    expect(state.country).toStrictEqual("France");
    const testCountryLatLng = "countryLatLng";
    dashboard.mutations.SET_COUNTRY_LAT_LNG(state, testCountryLatLng);
    expect(state.countryLatLng).toStrictEqual("countryLatLng");
    const testCountries = "countries";
    dashboard.mutations.SET_COUNTRIES(state, testCountries);
    expect(state.countries).toStrictEqual("countries");
    const testSummaryGlobal = { data: { Global: "summaryGlobal" } };
    dashboard.mutations.SET_SUMMARY_GLOBAL(state, testSummaryGlobal);
    expect(state.summaryGlobal).toStrictEqual("summaryGlobal");
    const testDateSummaryGlobal = { data: { Date: "dateSummaryGlobal" } };
    dashboard.mutations.SET_DATE_SUMMARY_GLOBAL(state, testDateSummaryGlobal);
    expect(state.dateSummaryGlobal).toStrictEqual("dateSummaryGlobal");
    const testDataChart = "dataChart";
    dashboard.mutations.SET_DATA_CHART(state, testDataChart);
    expect(state.dataChart).toStrictEqual("dataChart");
    const testErrorData = "errorData";
    dashboard.mutations.SET_ERROR_DATA(state, testErrorData);
    expect(state.errorData).toStrictEqual("errorData");
    const testLoadingSummary = "loadingSummary";
    dashboard.mutations.SET_LOADING_SUMMARY(state, testLoadingSummary);
    expect(state.loadingSummary).toStrictEqual("loadingSummary");
    const testLoadingMap = "loadingMap";
    dashboard.mutations.SET_LOADING_MAP(state, testLoadingMap);
    expect(state.loadingMap).toStrictEqual("loadingMap");
    const testLoadingSummaryWorld = "loadingSummaryWorld";
    dashboard.mutations.SET_LOADING_SUMMARY_WORLD(
      state,
      testLoadingSummaryWorld
    );
    expect(state.loadingSummaryWorld).toStrictEqual("loadingSummaryWorld");
    const testLoadingChart = "loadingChart";
    dashboard.mutations.SET_LOADING_CHART(state, testLoadingChart);
    expect(state.loadingChart).toStrictEqual("loadingChart");
    let testSummaryCountry = {
      data: { Countries: [{ Country: "France" }, { Country: "Sweden" }] },
    };
    dashboard.mutations.SET_SUMMARY_COUNTRY(state, testSummaryCountry);
    expect(state.summaryCountry).toStrictEqual({ Country: "France" });
  });
  it("3. actions", async () => {
    let commit;
    // countries
    commit = jest.fn();
    const testCountries = "countries";
    await dashboard.actions.countries({ commit }, testCountries);
    expect(commit).toHaveBeenCalledTimes(1);
    // country
    commit = jest.fn();
    const testCountry = "France";
    await dashboard.actions.country({ commit }, testCountry);
    expect(commit).toHaveBeenCalledWith("SET_COUNTRY", "France");
    // countryLongitudeLatitude
    commit = jest.fn();
    let response = undefined;
    try {
      response = await axios.get(
        process.env.VUE_APP_API_DAYONE + state.country
      );
    } catch (e) {
      console.error(e.message);
    }
    await dashboard.actions
      .countryLongitudeLatitude({ commit }, response.data[0])
      .catch((e) => {
        console.error(e.message);
      });
    expect(commit).toHaveBeenCalledTimes(2);
    expect(commit).toHaveBeenNthCalledWith(
      1,
      "SET_COUNTRY_LAT_LNG",
      response.data[0]
    );
    expect(commit).toHaveBeenNthCalledWith(2, "SET_ERROR_DATA", false);
  });

  /*  it("4. actions updateOptionChart", async () => {
    let commit = jest.fn();
    const response = await axios.get(
      process.env.VUE_APP_API_TOTAL_COUNTRY +
        "France" +
        "?from=2020-03-01T00:00:00Z&e=" +
        new Date().toJSON()
    );
    await dashboard.actions.updateOptionsChart(
      { commit },
      response.data
    );
    expect(commit).toHaveBeenCalledTimes(3);
    expect(commit).toHaveBeenNthCalledWith(1, "SET_ERROR_DATA", false);
    expect(commit).toHaveBeenNthCalledWith(2, "SET_LOADING_MAP", false);
    if (response)
      expect(commit).toHaveBeenNthCalledWith(
        3,
        "SET_DATA_CHART",
        response.data
      );
    else expect(commit).toHaveBeenNthCalledWith(1, "SET_ERROR_DATA", false);
  }); */
});
