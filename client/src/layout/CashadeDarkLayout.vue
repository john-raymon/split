<template>
  <div class="cashade-dark-layout">
    <section class="cashade dark-layout__inner">
      <header class="w-full py-16 flex items-center justify-between px-6 max-w-screen-lg mx-auto">
        <router-link to="/" class="w-24 h-auto">
          <Logo />
        </router-link>
        <router-link
          v-if="$route.name !== 'sign-up'"
          to="/sign-up"
          class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none"
        >
          Sign up now for early access
        </router-link>
        <router-link
          v-else
          to="/sign-in"
          class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none"
        >
          Sign in to your account
        </router-link>
      </header>
      <main class="main px-6">
        <slot />
      </main>
      <!-- <footer class="relative w-full bg-white h-56">
      </footer> -->
    </section>
  </div>
</template>

<script>
import Logo from "@/assets/svgs/cashade-logo.svg";

export default {
  name: "CashadeDarkLayout",
  components: {
    Logo
  }
};
</script>
<style lang="scss">
.cashade-dark-layout {
  @apply relative font-mont w-full bg-black;
  &__inner {
    @apply w-full;
  }
  .main {
    @apply flex h-auto;
    min-height: 80vh; // calc(100vh - 14rem); // 14rem is the height of the footer in this layout
  }
}
</style>
