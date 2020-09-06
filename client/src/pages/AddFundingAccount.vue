<template>
  <div class="funding-account overflow-y-auto">
    <form class="space-y-5 max-h-full max-w-md mx-auto" @submit.prevent>
      <h2 class="text-2xl mb-4 font-normal">
        Set-up & add your bank account.
        <span class="block text-gray-600 text-sm">
          to be used as a funding-source
        </span>
      </h2>

      <div>
        <label for="routing-number">
          Routing Number
        </label>
        <input
          class="text-field"
          type="text"
          name="routing-number"
          placeholder="Routing number"
          v-model="routingNumber"
        />
      </div>

      <div>
        <label for="account-number">
          Account Number
        </label>
        <input
          class="text-field"
          type="text"
          name="account-number"
          placeholder="Account number"
          v-model="accountNumber"
        />
      </div>

      <div>
        <label for="account-name">
          Account Name
        </label>
        <input
          class="text-field"
          type="text"
          name="account-name"
          placeholder="Account name"
          v-model="accountName"
        />
      </div>

      <button @click="onSubmit" class="button--secondary flex-grow rounded-md mr-1">
        Add funding source
      </button>
      <button
        @click="() => $router.push({ name: 'dashboard.homepage' })"
        type="submit"
        class="button--red flex-grow rounded-md bg-red-300"
      >
        Cancel
      </button>
    </form>
  </div>
</template>
<script>
/**
 * Add a new funding bank account
 * makes a request to the back-end, adding a new funding bank account
 */
export default {
  name: "AddFundingAccount",
  data() {
    return {
      routingNumber: "",
      accountNumber: "",
      accountName: ""
    };
  },
  methods: {
    onSubmit() {
      this.$http
        ._post("/users/fundingsources/bank", {
          routing_number: this.routingNumber,
          account_number: this.accountNumber,
          account_name: this.accountName
        })
        .then(body => {
          alert(JSON.stringify(body));
          this.routingNumber = "";
          this.accountNumber = "";
          this.accountName = "";
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when attempting to add a funding bank account", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.funding-account {
  @apply transition delay-300 font-mont bottom-0 left-0 pt-12 pl-10 pr-20;
}
</style>
