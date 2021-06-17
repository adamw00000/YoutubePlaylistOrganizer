<template>
  <div class="h-8 flex flex-row items-center mr-2">
    <!-- <h6 v-if="Vue3GoogleOauth.isAuthorized && $store.getters.isAuthenticated">Welcome, {{ this.email }}!</h6> -->
    <button class="ml-2"
      @click="handleClickSignIn" v-if="!$store.getters.isAuthenticated"> <!-- Vue3GoogleOauth.isInit && !Vue3GoogleOauth.isAuthorized -->
      Grant access to Youtube
    </button>
    <button class="ml-2"
      @click="handleClickSignOut" v-if="$store.getters.isAuthenticated"> <!-- Vue3GoogleOauth.isAuthorized -->
      Logout
    </button>
  </div>
</template>

<script lang='ts'>
import { inject, toRefs } from "vue";

export default {
  name: "GoogleLogin",
  data(): { store: any, gAuth: any, Vue3GoogleOauth: any } {
    return {
      store: this.$store,
      gAuth: this.$gAuth,
      Vue3GoogleOauth: null,
    };
  },
	computed: {
    isInit() {
      // @ts-ignore
      return this.Vue3GoogleOauth.isInit
    },
  },
  watch: {
    isInit(value: boolean) {
      if (!this.Vue3GoogleOauth.isAuthorized) {
        this.store.commit('setUserId', null);
        this.store.commit('setAuthCode', null);
      }
    },
  },
  methods: {
    async handleClickSignIn(): Promise<void> {
      try {
        const authCode = await this.gAuth.getAuthCode((isSignedIn: boolean) => {
          if (isSignedIn) {
            this.store.commit('setUserId', this.gAuth.instance.currentUser.get().getId());
          } else {
            this.store.commit('setUserId', null);
          }
        });        
        this.store.commit('setAuthCode', authCode);

        const userId = this.gAuth.instance.currentUser.get().getId();
        this.store.commit('setUserId', userId);
      } catch (error) {
        console.error(error);
      }
    },

    async handleClickSignOut(): Promise<void> {
      try {
        await this.gAuth.signOut();
        this.store.commit('logOut');
      } catch (error) {
        console.error(error);
      }
    },
  },
  setup(props) {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    return {
      Vue3GoogleOauth,
    };
  },
};
</script>

<style>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
}

button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>
