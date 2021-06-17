<template>
    <button 
        class="border border-black rounded pl-1 pr-1 m-0.5 focus:outline-none"
        :class="{ 'bg-blue-700': checked, 'text-white': checked }"
        v-on:click="onClick()">
        {{name}}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
  },
  data (): { checked: boolean; } {
    return {
      checked: false
    }
  },
  name: "ButtonToggle",
  methods: {
    onClick: function () {
        this.checked = !this.checked;
        this.$emit('toggleChanged', this.checked)
    }
  }
});
</script>