<template>
  <div class="homepage">
    <div class="homepage__hero relative flex flex-col justify-center">
      <div class="w-1/2 self-end max-w-sm pointer-events-none">
        <img class="pointer-events-none" src="./../assets/media/marketing-site-hero.png" />
      </div>
      <p
        class="absolute font-mont font-normal text-white mb-2 text-base sm:mb-20 lg:mb-0 md:text-2xl text-left tracking-wide w-3/4 self-start pr-8"
      >
        <span class="font-bold">
          Virtual debit cards.
        </span>
        <br />
        Designed on the simple premise that debit cards are much more useful when you can customize,
        control, & create them.
        <span class="block text-sm text-gray-500 pt-2">
          Learn more below.
        </span>
      </p>
    </div>
    <div class="flex flex-col md:flex-row items-center py-8">
      <div class="w-full overflow-hidden h-auto py-6">
        <img class="pointer-events-none" src="./../assets/media/split-screenshot-2.png" />
      </div>
      <div class="md:order-first space-y-6 md:w-3/4">
        <p class="font-mont font-light text-white text-md text-left tracking-wider self-start">
          <span class="font-medium">Create cards for your own specific spending,</span> (like Netflix, Uber, or even the Playstation
          network).
        </p>

        <p class="font-mont font-light text-white text-md text-left tracking-wider self-start">
          <span class="font-medium">How is this useful?</span>
          <br />
          If you ever find yourself second-guessing sharing your debit card’s information, whether
          with your children or an online business, just create a virtual card and share that
          instead.
        </p>
        <div>
          <router-link
            to="/sign-up"
            class="bg-green-400 text-green-800 rounded-full px-3 py-2 text-xs focus:outline-none"
          >
            Sign up now for early access
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Homepage"
};
</script>
<style lang="scss">
.homepage {
  @apply w-full h-auto mb-10;
}
</style>
