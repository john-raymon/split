<template>
  <div class="dark-layout">
    <section class="dark-layout__inner">
      <header class="w-full pt-20 pb-16 flex items-center justify-between pb-8">
        <router-link to="/" class="w-24 h-auto">
          <Logo />
        </router-link>
        <router-link v-if="$route.name !== 'sign-up'" to="/sign-up" type="submit" class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none">
          Sign up now for early access
        </router-link>
        <router-link v-else type="submit" to="/sign-in" class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none">
          Sign in to your account
        </router-link>
      </header>
      <main class="main">
        <slot />
      </main>
    </section>
  </div>
</template>

<script>
import Logo from "@/assets/svgs/dark-logo.svg";

export default {
  name: "DarkLayout",
  components: {
    Logo
  }
};
</script>
<style lang="scss">
  .dark-layout {
    @apply relative font-mont w-full bg-black px-6;
    &__inner {
      @apply max-w-screen-lg mx-auto;
    }
    .main {
      @apply flex h-auto;
      min-height: 100vh; // 6.25rem is the height of the footer in this layout
    }
  }
</style>
