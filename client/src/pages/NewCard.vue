<template>
  <div class="new-card-container">
    <div class="max-w-md" v-if="!fundingAccountTokenSelected">
      <p class="text-black text-xl font-normal">
        Choose the funding source from your connected funding accounts below.
        <span class="block text-sm tracking-wide font-light text-gray-800 pt-2">
          This funding account will only be charged for payments made on your Split virtual cards.
        </span>
        <select
          v-model="fundingAccountToken"
          class="overflow-hidden mt-2 text-base w-full bg-white text-gray-800 appearance-none rounded p-2 border border-gray-400 outline-none"
        >
          <option value="" selected>
            Select an account
          </option>
          <option
            v-for="account in enabledFundingSource"
            :key="account.token"
            :value="account.token"
          >
            {{
              `Acct *${account.last_four}${account.account_name &&
                ` - ${account.account_name}`} - ${account.type}`
            }}
          </option>
        </select>
      </p>
      <!-- render select with list of options with funding account token values-->
      <p class="text-sm font-bold py-2 text-black">
        or
      </p>
      <router-link
        to="/dashboard/funding/add"
        class="border-b border-gray-400 text-gray-800 text-sm"
      >
        Click here to add a new funding account
      </router-link>
      <div class="card-form__controls flex justify-between space-x-2 py-4 max-w-md">
        <button
          @click="() => $router.push({ name: 'dashboard.homepage' })"
          type="submit"
          class="button--red w-1/2 rounded-md self-end bg-red-300"
        >
          Cancel
        </button>
        <button
          :disabled="!fundingAccountToken"
          @click="() => ($data.fundingAccountTokenSelected = true)"
          type="submit"
          class="button--secondary w-1/2 rounded-md self-end"
        >
          Continue
        </button>
      </div>
    </div>
    <form v-else class="w-full text-gray-800 space-y-5 max-h-full max-w-md mx-auto" @submit.prevent>
      <p class="text-black text-3xl mb-4 font-medium">
        Create a card:
      </p>

      <div class="border-b border-gray-400 pb-4">
        <div class="card-spend-limit flex flex-col">
          <label class="text-md" for="spend-limit">What's this card for? (memo):</label>
          <input
            class="outline-none text-black text-xl bg-transparent appearance-none mb-4 border-b border-color-500"
            name="card-memo"
            type="text"
            v-model="memo"
            placeholder="Card memo"
          />
        </div>
        <div class="space-x-2 text-black text-sm">
          <input
            v-model="cardType"
            type="radio"
            id="MERCHANT_LOCKED"
            name="card-type"
            value="MERCHANT_LOCKED"
            checked
          />
          <label class="cursor-pointer" for="MERCHANT_LOCKED">Lock this card to a merchant</label>
        </div>

        <div class="space-x-2 text-black text-sm">
          <input
            v-model="cardType"
            type="radio"
            id="SINGLE_USE"
            name="card-type"
            value="SINGLE_USE"
          />
          <label class="cursor-pointer" for="SINGLE_USE">Make this a single-use card</label>
        </div>

        <div class="space-x-2 text-black text-sm">
          <input v-model="cardType" type="radio" id="UNLOCKED" name="card-type" value="UNLOCKED" />
          <label class="cursor-pointer" for="UNLOCKED">Make this an unlocked card</label>
        </div>
      </div>

      <div class="card-spend-limit flex flex-col border-b border-gray-300 pb-4">
        <label class="text-md" for="spend-limit">Spending limit amount:</label>
        <money
          class="outline-none text-indigo-500 text-6xl md:text-8xl bg-transparent appearance-none"
          name="card-spend-limit"
          v-bind="money"
          id="spend-limit"
          v-model="spendLimit"
        />
        <span>(USD)</span>
      </div>

      <div class="flex flex-col space-y-2 pb-4">
        <label for="card-spending-limit-duration text-md">Spending limit duration:</label>

        <select
          v-model="spendingLimitDuration"
          class="block rounded-none bg-transparent card-spending-limit-duration flex p-2 text-black outline-none border-b border-gray-200"
          name="card-spending-limit-duration"
          id="card-spending-limit-duration"
        >
          <option value="">--Select limit duration--</option>
          <option value="TRANSACTION">Limit per transaction</option>
          <option value="MONTHLY">Limit monthly</option>
          <option value="ANNUALLY">Limit annually</option>
          <option value="FOREVER">Limit forever</option>
        </select>
      </div>

      <div class="card-form__controls flex justify-between flex-wrap space-x-2 pb-8 max-w-md">
        <button
          @click="() => $router.push({ name: 'dashboard.homepage' })"
          type="submit"
          class="button--red flex-grow rounded-md self-end bg-red-300"
        >
          Cancel
        </button>
        <button
          @click="handleCreateCardSubmit"
          type="submit"
          class="button--secondary flex-grow rounded-md self-end"
        >
          Create card
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { Money } from "v-money";
import { mapState, mapActions } from "vuex";

/**
 * create new virtual card resource form
 * makes a request to the back-end, creating a new virtual card
 */
export default {
  name: "NewCard",
  components: {
    Money
  },
  data() {
    return {
      spendLimit: "0",
      memo: "",
      cardType: "UNLOCKED",
      fundingAccountToken: "",
      spendingLimitDuration: "TRANSACTION",
      fundingAccountTokenSelected: false,
      money: {
        prefix: "$",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    };
  },
  computed: {
    ...mapState(["fundingSources"]),
    enabledFundingSource() {
      return this.fundingSources.filter(account => account.state === "ENABLED");
    }
  },
  methods: {
    ...mapActions(["fetchVirtualDebitCards"]),
    handleCreateCardSubmit() {
      this.$http
        ._post("/users/cards", {
          funding_token: this.fundingAccountToken,
          spend_limit_duration: this.spendingLimitDuration,
          type: this.cardType,
          memo: this.memo,
          spend_limit: this.spendLimit * 100
        })
        .then(body => {
          this.$toast.success("Your new card has been successfully created.");
          // refetch virtual debit card and update state
          this.fetchVirtualDebitCards(this.$http);
          this.$router.push({
            path: `/dashboard/card/manage/${body.virtualCard.token}`
          });
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
.new-card-container {
  @apply transition delay-300 font-mont text-black h-full pt-12;
}
</style>
