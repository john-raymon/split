<template>
  <div class="landing-page-layout">
    <section class="landing-page-layout__inner">
      <main class="main">
        <slot />
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPageLayout"
};
</script>
<style lang="scss">
.landing-page-layout {
  @apply relative font-mont w-full bg-white px-6;
  &__inner {
    @apply max-w-screen-lg mx-auto;
  }
  .main {
    @apply flex h-auto;
    min-height: 100vh; // 6.25rem is the height of the footer in this layout
  }
}
</style>
