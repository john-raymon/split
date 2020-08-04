<template>
  <div class="new-card-container overflow-y-auto">
    <div class="max-w-md mx-auto" v-if="!fundingAccountToken">
      <p class="text-white text-3xl font-bold">
        How would you like to fund this card?
        <span class="block text-sm tracking-wide font-light text-gray-400 pt-2">
          This funding account will only be charged
          for payments made on your Split virtual cards.
        </span>
      </p>
      <!-- render select with list of options with funding account token values-->
      <p class="text-sm font-bold py-2 text-white">
        or
      </p>
      <router-link to="/funding-account/new" class="border-b border-gray-400 text-gray-400 text-sm">
        Click here to add a new funding account
      </router-link>
      <div class="card-form__controls flex justify-between space-x-2 py-4 max-w-md">
        <button @click="() => $router.push({ name: 'dashboard' })" type="submit" class="button--red w-1/2 rounded-md self-end bg-red-300">
          Cancel
        </button>
        <button @click="() => $data.fundingAccountToken = true" type="submit" class="button--secondary w-1/2 rounded-md self-end">
          Continue
        </button>
      </div>
    </div>
    <form v-else class="text-gray-400 space-y-5 max-h-full max-w-md mx-auto" @submit.prevent>
      <p class="text-white text-3xl mb-4 font-bold">
        Create a card:
      </p>

      <div>
        <div class="space-x-2 text-white text-sm">
          <input
            type="radio"
            id="MERCHANT_LOCKED"
            name="card-type"
            value="MERCHANT_LOCKED"
            checked
          />
          <label class="cursor-pointer" for="MERCHANT_LOCKED">Lock this card to a merchant</label>
        </div>

        <div class="space-x-2 text-white text-sm">
          <input type="radio" id="SINGLE_USE" name="card-type" value="SINGLE_USE" />
          <label class="cursor-pointer" for="SINGLE_USE">Make this a single-use card</label>
        </div>
      </div>

      <div class="card-spend-limit flex flex-col">
        <label class="text-md" for="spend-limit">Spending limit amount:</label>
        <input
          class="outline-none text-indigo-500 text-6xl md:text-8xl bg-transparent appearance-none"
          name="card-spend-limit"
          v-money="money"
          id="spend-limit"
          value="0"
        />
        <span>(USD)</span>
      </div>

      <div class="flex flex-col space-y-2 pb-4">
        <label for="card-spending-limit-duration text-md">Spending limit duration:</label>

        <select class="block rounded-none bg-transparent card-spending-limit-duration flex p-2 text-white outline-none border-b border-gray-200" name="card-spending-limit-duration" id="card-spending-limit-duration">
          <option value="">--Select limit duration--</option>
          <option value="TRANSACTION">Limit per transaction</option>
          <option value="MONTHLY">Limit monthly</option>
          <option value="ANNUALLY">Limit annually</option>
          <option value="FOREVER">Limit forever</option>
        </select>
      </div>

      <div class="card-form__controls flex justify-between flex-wrap space-x-2 pb-8 max-w-md">
        <button @click="() => $router.push({ name: 'dashboard' })" type="submit" class="button--red flex-grow rounded-md self-end bg-red-300">
          Cancel
        </button>
        <button type="submit" class="button--secondary flex-grow rounded-md self-end">
          Create card
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { VMoney } from "v-money";

export default {
  name: "NewCard",
  data() {
    return {
      fundingAccountToken: '',
      money: {
        prefix: "$",
        suffix: "",
        precision: 2,
        masked: false /* doesn't work with directive */
      }
    };
  },
  directives: {
    money: VMoney
  }
};
</script>

<style scoped lang="scss">
.new-card-container {
  @apply fixed w-full transition delay-300 font-mont h-full bg-gray-900 bottom-0 left-0 pt-12 pl-10 pr-20;
}
</style>
