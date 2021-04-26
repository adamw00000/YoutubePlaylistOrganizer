<template>
    <h2>
        Liked videos
    </h2>
  <div class="flex flex-col items-center">
    <table>
        <thead>
            <th />
            <th>Video</th>
            <th>Url</th>
        </thead>
        <tbody>
            <tr v-for="v in likedVideos" :key="v.id">
                <td>
                    <img :src="v.imageUrl"/>
                </td>
                <td>{{v.name}}</td>
                <td>
                    <a :href="'https://www.youtube.com/watch?v='+v.id">Link</a>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, Store } from "vuex";
import { Video } from '../models/video'
import YoutubeService from "../services/YoutubeService";

export default defineComponent({
  name: "LikedVideos",
  data (): { loading: false; likedVideos: Video[]; error: null; } {
    return {
      loading: false,
      likedVideos: [],
      error: null
    }
  },
  created(): void {
      this.fetchData()
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
      console.log(this.likedVideos);
    },
  },
});
</script>