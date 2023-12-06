<template>
  <UserCreationView/>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserCreationView from "@/views/UserCreationView.vue";

export default defineComponent({
  name: "App",
  components: {
    UserCreationView
  },
});
</script>

<style>
</style>
