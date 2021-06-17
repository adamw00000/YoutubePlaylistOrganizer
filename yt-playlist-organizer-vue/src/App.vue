<template>
  <header>
    <TopBar />
  </header>
  <section id="main">
    <LikedVideos />
  </section>
</template>

<script lang="ts">
import TopBar from "./components/TopBar.vue";
import LikedVideos from "./components/LikedVideos.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    TopBar,
    LikedVideos,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
