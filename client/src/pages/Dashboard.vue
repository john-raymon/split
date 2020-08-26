<template>
  <div class="w-full">
    <div v-if="!userAuth.earlyAccess" class="pre-dashboard">
      <p
        class="font-mont font-bold max-w-lg font-medium text-indigo-900 text-lg md:text-2xl text-left py-10"
      >
        You’re in! Welcome to your Split dashboard.
        <br />
        <br />
        Soon you’ll be able to create up to 5 virtual debit cards linked to your bank account or
        debit card.
        <br />
        <br />
        We’ll email updates on your early access soon.
      </p>
    </div>
    <div v-else class="dashboard">
      <div class="virtual-debit-cards">
        <router-link
          class="flex mt-6 mb-2 items-center text-gray-600 hover:text-gray-500 text-sm tracking-widest"
          to="dashboard/card/new"
        >
          <div class="w-4 h-4 fill-current mr-2">
            <svg width="100%" height="100%" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 0C5.63181 0 5.33333 0.298477 5.33333 0.666667V5.33333H0.666667C0.298477 5.33333 0 5.63181 0 6C0 6.36819 0.298477 6.66667 0.666667 6.66667H5.33333V11.3333C5.33333 11.7015 5.63181 12 6 12C6.36819 12 6.66667 11.7015 6.66667 11.3333V6.66667H11.3333C11.7015 6.66667 12 6.36819 12 6C12 5.63181 11.7015 5.33333 11.3333 5.33333H6.66667V0.666667C6.66667 0.298477 6.36819 0 6 0Z"
              />
            </svg>
          </div>
          Create a new card
        </router-link>
      </div>
      <p class="text-gray-800 font-bold text-2xl tracking-tight mb-2">
        Virtual Cards ({{ amountOfVirtualDebitCards }}):
      </p>
      <div class="w-full flex flex-col max-w-sm space-y-4">
        <div v-for="card in virtualDebitCards.data" :key="card.last_four">
          <div class="virtual-debit-card-container">
            <div
              class="virtual-debit-card-container__contents flex flex-col items-center justify-center"
            >
              <div class="text-lg text-gray-100 text-tracking-wider text-center w-full px-10">
                <p class="text-white text-xs text-left">
                  {{ card.memo }}
                </p>
                <p class="text-left">
                  <span class="text-gray-500">
                    {{
                      `&#9679;&#9679;&#9679;&#9679;   &#9679;&#9679;&#9679;&#9679;   &#9679;&#9679;&#9679;&#9679;   `
                    }}
                  </span>
                  {{ card.last_four }}
                </p>
                <div class="flex flex-row justify-between text-right">
                  <div></div>
                  <div class="text-sm">
                    <p class="text-gray-500">
                      Expires
                    </p>
                    <p>{{ card.exp_month }}/{{ card.exp_year }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-controls">
            <div class="flex items-center justify-between text-xs flex-row py-4">
              <BaseSwitch :toggled="card.state === 'OPEN'">
                  <span class="text-g">
                    On / Off
                  </span>
              </BaseSwitch>

              <a class="flex items-center">
                <div class="inline-block w-4 h-4 mr-1 fill-current">
                  <svg width="100%" height="100%" viewBox="0 0 13 13">
                  <path d="M5.6875 7.71875C5.60718 7.71871 5.52867 7.69487 5.4619 7.65023C5.39513 7.60558 5.34308 7.54215 5.31235 7.46794C5.28162 7.39373 5.27357 7.31208 5.28923 7.2333C5.30489 7.15452 5.34355 7.08215 5.40033 7.02533L9.41053 3.01514C9.20299 2.90245 8.97053 2.84353 8.73438 2.84375H2.64062C2.26364 2.84415 1.90222 2.99409 1.63565 3.26065C1.36909 3.52722 1.21915 3.88864 1.21875 4.26563V10.3594C1.21915 10.7364 1.36909 11.0978 1.63565 11.3644C1.90222 11.6309 2.26364 11.7808 2.64062 11.7813H8.73438C9.11136 11.7808 9.47278 11.6309 9.73935 11.3644C10.0059 11.0978 10.1558 10.7364 10.1562 10.3594V4.26563C10.1565 4.02947 10.0975 3.79701 9.98486 3.58947L5.97467 7.59967C5.93703 7.63749 5.89228 7.66748 5.84299 7.68792C5.7937 7.70836 5.74086 7.71884 5.6875 7.71875Z" />
                  <path d="M11.375 1.21875H8.53125C8.42351 1.21875 8.32017 1.26155 8.24399 1.33774C8.1678 1.41392 8.125 1.51726 8.125 1.625C8.125 1.73274 8.1678 1.83608 8.24399 1.91226C8.32017 1.98845 8.42351 2.03125 8.53125 2.03125H10.3942L9.41053 3.01514C9.65344 3.14708 9.85292 3.34657 9.98486 3.58947L10.9688 2.60584V4.46875C10.9688 4.57649 11.0116 4.67983 11.0877 4.75601C11.1639 4.8322 11.2673 4.875 11.375 4.875C11.4827 4.875 11.5861 4.8322 11.6623 4.75601C11.7384 4.67983 11.7812 4.57649 11.7812 4.46875V1.625C11.7812 1.51726 11.7384 1.41392 11.6623 1.33774C11.5861 1.26155 11.4827 1.21875 11.375 1.21875Z" />
                  </svg>
                </div>
                Manage card
              </a>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import BaseSwitch from "@/components/ui/BaseSwitch";

export default {
  name: "Dashboard",
  components: {
    BaseSwitch,
  },
  props: {
    userAuth: {
      type: Object,
      default: () => {}
    },
    virtualDebitCards: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    amountOfVirtualDebitCards() {
      if (!this.virtualDebitCards) {
        return "";
      }
      return this.virtualDebitCards.total_entries;
    }
  }
};
</script>

<style scoped lang="scss">
.virtual-debit-card-container {
  @apply relative w-full bg-black rounded-lg text-gray-200;
  padding-bottom: 60%;
  &__contents {
    @apply absolute inset-0;
  }
}
.card-controls {
  @apply w-full -mt-4 pt-4 px-4 bg-gray-900 rounded-bl-lg rounded-br-lg text-white;
}
</style>
