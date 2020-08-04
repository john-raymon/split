<template>
  <div class="dashboard">
    <router-link
      v-if="false"
      :to="{ name: 'new-card' }"
      class="my-4 hover:text-gray-400 p-1 flex justify-between text-gray-500 text-sm fill-current items-center"
    >
      <XSvg class="w-3 text-gray-600 mr-2" />
      Create a new card
    </router-link>
    <router-view />
  </div>
</template>
<script>
import XSvg from "@/assets/svgs/x.svg";

export default {
  name: "Dashboard",
  components: {
    XSvg
  }
};
</script>
<style lang="scss">
.dashboard {
  max-height: 80vh;
}
</style>
