<template>
  <div class="w-full">
    <router-view
      :userAuth="userAuth"
      :virtualDebitCards="virtualDebitCards"
      :amountOfVirtualDebitCards="amountOfVirtualDebitCards"
    >
    </router-view>
  </div>
</template>
<script>
export default {
  name: "Dashboard",
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
        return 0;
      }
      return this.virtualDebitCards.total_entries;
    }
  }
};
</script>
