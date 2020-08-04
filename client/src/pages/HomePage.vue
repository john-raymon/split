<template>
  <div class="homepage">
    <div class="homepage__hero relative flex flex-col justify-end md:justify-center">
      <div class="w-3/4 self-end max-w-sm">
        <img src="./../assets/media/marketing-site-hero.png" />
      </div>
      <p class="absolute font-mont text-white mb-16 text-lg sm:mb-20 lg:mb-0 md:text-2xl text-left tracking-wide w-3/4 self-start">
        <span class="font-bold">
          Virtual debit cards.
        </span>
        <br />
        Designed on the
        simple premise
        that debit cards are
        much more useful
        when you can
        customize, control,
        & create them.
      </p>
    </div>
  </div>
</template>
<script>

export default {
  name: "Homepage",
};
</script>
<style lang="scss">
.homepage {
  @apply w-full h-auto;
}
</style>
