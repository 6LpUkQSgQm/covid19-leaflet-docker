<template id="app">
  <v-app
    class="my-app"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <Navigation />
    <Dashboard />
    <Footer />
  </v-app>
</template>

<script>
import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";
import Dashboard from "@/pages/Dashboard";

export default {
  name: "App",
  components: {
    Navigation,
    Dashboard,
    Footer,
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
<style>
.myapp {
  position: relative;
}
.my-app.v-application .primary--text {
  color: grey !important;
}
</style>
