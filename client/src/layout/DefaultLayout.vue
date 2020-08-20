<template>
  <div class="default-layout px-8">
    <header class="w-full pt-20 flex flex-col border-b border-indigo-200 pb-8">
      <router-link to="/" class="w-24 h-auto">
        <Logo />
      </router-link>
      <div v-if="userAuth.isAuth" class="mt-16 flex justify-between items-center">
        <h1 class="text-gray-700 text-3xl">
          <span class="text-indigo-800 font-black">
            Hello,
          </span>
          <br />
          John
        </h1>
        <ul class="text-xs text-right text-gray-500 tracking-widest font-bold">
          <template v-if="userAuth.isAuth">
            <li>
              <router-link to="">
                Account Settings
              </router-link>
            </li>
            <li>
              <a href="" @click.prevent="$emit('log-out')">
                Sign out
              </a>
            </li>
          </template>
          <template v-else>
            <li>
              <router-link to="/sign-up">
                Sign up
              </router-link>
            </li>
            <li>
              <router-link to="/sign-in">
                Sign in
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="w-full flex justify-center text-gray-800 text-xs tracking-widest py-6">
      <a href="https://github.com/dreamineers" target="_blank">
        Powered by Dreamineers Inc.
      </a>
    </footer>
  </div>
</template>

<script>
import Logo from "@/assets/svgs/logo.svg";

export default {
  name: "DefaultLayout",
  props: ["userAuth"],
  components: {
    Logo
  }
};
</script>
<style lang="scss">
html,
body {
  @apply bg-gray-100;
}
.default-layout {
  @apply h-full font-mont max-w-screen-lg mx-auto px-2 bg-gray-100;
  .main {
    @apply flex;
    min-height: 100vh; // 6.25rem is the height of the footer in this layout
  }
}
</style>
