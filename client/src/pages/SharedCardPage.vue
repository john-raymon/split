<template>
  <div class="py-5 w-full flex items-center flex-col">
    <template v-if="isAuth">
      <!-- show card -->
    </template>
    <p>
      Shared card
    </p>
  </div>
</template>
<script>

export default {
  name: "SharedCardPage",
  data() {
    return {
      isAuth: false,
      user: null,
      token: null,
    };
  },
  watch: {
    isAuth: {
      handler(val, oldVal) {
        if (!val) {

        }
      },
      immediate: true,
    },
  },
};
</script>
