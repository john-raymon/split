<template>
  <div class="dark-layout">
    <section class="dark-layout__inner">
      <header class="w-full pt-20 flex flex-col pb-8">
        <div class="w-24 h-auto">
          <Logo />
        </div>
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
    @apply relative font-mont w-full bg-black px-8;
    &__inner {
      @apply max-w-screen-lg mx-auto;
    }
    .main {
      @apply flex h-auto;
      min-height: 100vh; // 6.25rem is the height of the footer in this layout
    }
  }
</style>
