<template>
  <div class="homepage relative flex flex-col items-center lg:flex-row max-w-4xl mx-auto lg:space-x-10 pb-4">
      <div class="relative w-full lg:w-1/2 mb-20">
        <p class="relative text-5xl mb-4 font-normal font-bold text-white track-wider max-w-2xl leading-none pr-5 z-10">
          <span class="absolute right-0 bottom-0 w-32">
            <img src="./../assets/media/hero-cards.png" class="float-animation-slow w-full -mb-10"/>
          </span>
          <span class="relative">Design & gift a virtual prepaid card</span>
        </p>
        <p class="relative text-lg font-medium text-yellow-400 track-wider leading-none z-10">
          A better way to send money.
        </p>
        <div class="absolute w-full mx-auto sm:mx-0 bottom-0 z-0">
          <img src="./../assets/media/hero-avatarz.png" class="w-full -mb-20" />
        </div>
      </div>
      <div class="w-full h-auto lg:w-1/2 py-6 lg:py-0 lg:px-4">
        <p class="w-full font-medium text-left pt-2 lg:pt-0 text-2xl lg:text-2xl pr-10 text-yellow-400">
          1. Choose or <span class="text-lightPink">design</span> a virtual debit card using audio/video, filters, gifs, and a greeting message.
          <br/>
          <br/>
          2. <span class="text-lightPink">Add money</span> to the card
          <br />
          <br />
          3. <span class="text-lightPink">Send gift</span> to a family or friend via the web.
          <br />
        </p>
        <div class="relative flex w-full py-5">
          <router-link to="dashboard" class="mt-8 bg-lightPink text-darkPink text-sm uppercase text-center text-wider font-bold rounded-md w-full py-4 px-2">
            get started
          </router-link>
        </div>
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
  @apply w-full;

  .float-animation-slow {
    animation: bounce 4s ease-in-out infinite;
  }
}
</style>
