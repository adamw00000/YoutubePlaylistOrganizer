<template>
  <div class="box-border w-80 p-1">
    <div class="border border-black rounded flex flex-col items-center">
      <div class="w-full p-1 truncate">
        {{ name }}
      </div>
      <div style="position: relative; padding-top: 56.25%;" class='w-full'>
        <img v-if="!showVideo" 
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          :src="imageUrl"
          @click="showVideo = true"/>
        <iframe v-if="showVideo"
          :src="'http://www.youtube.com/embed/'+id+'?autoplay=1'"
          type="text/html"
          allowfullscreen
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          frameborder="0"></iframe>
      </div>
      <div class="flex flex-row flex-wrap items-center justify-center">
        <ButtonToggle
          v-for="p of playlists"
          :key="p.id"
          :name="p.name"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonToggle from "../components/ButtonToggle.vue";

export default defineComponent({
  props: {
    id: String,
    name: String,
    imageUrl: String,
    playlists: [],
  },
  components: {
    ButtonToggle,
  },
  data (): { showVideo: boolean; } {
    return {
      showVideo: false,
    }
  },
  name: "PlaylistEntry",
});
</script>