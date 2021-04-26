<template>
    <div class="grid items-center grid-cols-3 pt-2 pb-2 bg-gray-300">
        <h4 class="col-start-1 pl-2 justify-self-start">
            Home
        </h4>
        <GoogleLogin class="col-start-3 justify-self-end" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import GoogleLogin from './GoogleLogin.vue'

    export default defineComponent({
        name: 'TopBar',
        components: {
            GoogleLogin
        }
    })
</script>

<style scoped>

</style>