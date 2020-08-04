<template>
  <div class="homepage">
    <div class="homepage__hero relative flex flex-col justify-center">
      <div class="w-3/4 self-end max-w-sm">
        <img src="./../assets/media/marketing-site-hero.png" />
      </div>
      <p class="absolute font-mont font-medium text-white mb-2 text-base sm:mb-20 lg:mb-0 md:text-2xl text-left tracking-wide w-3/4 self-start pr-8">
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
    <p class="font-mont text-white text-sm text-left tracking-wider w-full self-start pt-4 mb-2">
    Create debit cards for specific spending,
    like a card locked to <span class="text-red-600">Netflix</span> or the <span class="text-blue-600">Playstation Network</span> with a set monthly limit.
    </p>
    <router-link to="/sign-up" class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none">
      Sign up now for early access
    </router-link>
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
