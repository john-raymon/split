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
          to="/dashboard/card/new"
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
      <p class="text-gray-800 font-bold text-2xl tracking-tight mb-2 ">
        Virtual Cards ({{ amountOfVirtualDebitCards }}):
      </p>
      <div class="w-full flex flex-wrap -m-1 sm:-m-4 pt-4">
        <div
          v-for="card in virtualDebitCards.data"
          :key="card.last_four"
          class="w-full sm:w-1/2 p-1 sm:p-4 mb-2"
        >
          <VirtualCard :card="card" />
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import VirtualCard from "@/components/VirtualCard";

export default {
  name: "Dashboard",
  components: {
    VirtualCard
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
