<template>
  <h1>
      Liked videos
  </h1>
  <div class="flex flex-col items-center">
    <div class="flex flex-row flex-wrap items-center justify-center w-4/5 pt-4 pb-4">
      <PlaylistEntry 
        v-for="video of likedVideos"
        :key="video.id"
        :id="video.id"
        :name="video.name"
        :imageUrl="video.imageUrl"
        :playlists="playlists">
      </PlaylistEntry>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, Store } from "vuex";
import { Video } from '../models/video'
import { PlaylistInfo } from '../models/playlistInfo'
import PlaylistEntry from "../components/PlaylistEntry.vue";
import YoutubeService from "../services/YoutubeService";

export default defineComponent({
  name: "LikedVideos",
  components: {
    PlaylistEntry,
  },
  data (): { loading: false; likedVideos: Video[]; playlists: PlaylistInfo[]; error: null; } {
    return {
      loading: false,
      likedVideos: [],
      playlists: [],
      error: null
    }
  },
  created(): void {
      this.fetchData();
  },
	computed: {
    ...mapState({
      authState: (state: any) => state.auth,
      userId: (state: any) => state.auth.userId,
      authCode: (state: any) => state.auth.authCode,
    })
  },
	watch: {
		userId(): void {
      console.log('userId changed')
      this.fetchData();
		},
		authCode(): void {
      console.log('authCode changed')
      this.fetchData();
		},
	},
  methods: {
    async fetchData(): Promise<void> {
      const userId: string = this.authState.userId;
      const authCode: string = this.authState.authCode;
      console.log('Checking for request:', this.authState.userId, this.authState.authCode)
      if (userId == null || authCode == null) {
        this.likedVideos = [];
        return;
      }
      const ytService: YoutubeService = new YoutubeService();
      
      this.likedVideos = await ytService.getLikedVideos(userId, authCode);
      this.playlists = await ytService.getPlaylists(userId, authCode);
    },
  },
});
</script>