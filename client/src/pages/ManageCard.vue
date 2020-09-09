<template>
  <div class="w-full h-full inset-0 update-card-container">
    <div v-if="loading">
      <!-- loading -->
    </div>
    <div v-else-if="error">
      <!-- error UI (e.g. not found) -->
    </div>
    <div class="w-full" v-else>
      <div class="card-wrapper max-w-sm mx-auto my-12">
        <VirtualCard @shared-card="fetchCard" :card.sync="card" />
      </div>

      <div class="card-transactions-container max-w-sm mx-auto">
        <div class="cardholders-list" v-if="sharedCardholders.length > 0">
          <p class="w-full text-lg my-2 pb-2 border-b border-gray-200 text-gray-800 mb-4">
            Sharing with
          </p>
          <ul class="space-y-2">
            <li v-for="cardholder in sharedCardholders" :key="cardholder.authorizedCardholder.id">
              <div class="flex flex-row justify-between">
                <p class="text-green-800 rounded-full py-1 text-xs focus:outline-none">
                  {{ cardholder.authorizedCardholder.email }}
                </p>
                <button
                  v-if="cardholder.sharing"
                  @click="
                    () =>
                      onRevokeShareCard(cardholder.cardToken, cardholder.authorizedCardholder.email)
                  "
                  class="bg-green-400 text-green-800 capitalize rounded-full px-2 py-1 text-xs focus:outline-none"
                >
                  stop sharing
                </button>
              </div>
            </li>
          </ul>
        </div>
        <p class="w-full text-lg my-4 pb-2 border-b border-gray-200 text-gray-800">
          Card transactions
        </p>
        <table class="w-full">
          <tr class="text-left text-sm text-gray-600">
            <th class="font-light">Merchant / Date</th>
            <th class="font-light text-right">Amount</th>
          </tr>
          <tr
            class="border-b border-gray-200 text-gray-700 font-light"
            v-for="transaction in transactions"
            :key="transaction.token"
          >
            <td class="py-2">
              {{ transaction.created | moment("MMM Do YYYY") }}
              <p>
                {{ transaction.merchant.descriptor }}
              </p>
            </td>
            <td class="text-right">${{ (transaction.amount / 100).toFixed(2) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
// import { Money } from "v-money";
import { mapState } from "vuex";
import VirtualCard from "@/components/VirtualCard";

/**
 * update an existing virtual card resource form
 * makes a PUT request to the back-end, updating a new virtual card
 */
export default {
  name: "ManageCard",
  components: {
    VirtualCard
  },
  data() {
    return {
      loading: true,
      card: {},
      error: null,
      transactions: [],
      cardholders: []
    };
  },
  beforeRouteLeave({ path }, from, next) {
    console.log(from, next);
    next(false);
    window.location = path;
  },
  created() {
    this.fetchCard().then(() => {
      this.fetchTransactions();
    });
  },
  // data() {
  //   return {
  //     spendLimit: "0",
  //     memo: "",
  //     cardType: "UNLOCKED",
  //     fundingAccountToken: "",
  //     spendingLimitDuration: "TRANSACTION",
  //     fundingAccountTokenSelected: false,
  //     money: {
  //       prefix: "$",
  //       suffix: "",
  //       precision: 2,
  //       masked: false /* doesn't work with directive */
  //     }
  //   };
  // },
  computed: {
    ...mapState(["fundingSources"]),
    enabledFundingSource() {
      return this.fundingSources.filter(account => account.state === "ENABLED");
    },
    sharedCardholders() {
      return this.cardholders.filter(c => c.sharing);
    }
  },
  methods: {
    onRevokeShareCard(cardToken, recipientEmail) {
      this.$http
        ._post("/users/share-card?revoke=true", {
          cardToken,
          recipientEmail
        })
        .then(() => {
          this.$toast.success(
            `You're no longer sharing your card ending in ${this.card.last_four} with ${recipientEmail}`
          );
          return this.fetchCard();
        })
        .catch(() => {
          this.$toast.error("There was an error while unsharing your card.");
        });
    },
    fetchTransactions() {
      this.$http
        ._get(`/users/transactions?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          console.log(body);
          if (body.total_entries > 0) {
            this.transactions = body.data;
          }
        })
        .catch(err => {
          this.error = err;
          console.log("there was an error while fetching transactions");
        });
    },
    fetchCard() {
      this.error = null;
      return this.$http
        ._get(`/users/cards?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          console.log(body);
          if (body.total_entries === 1) {
            this.card = body.data[0];
            this.cardholders = body.cardholders;
          }
        })
        .catch(err => {
          this.error = err;
          console.log("there was an error while querying for a specific virtual card");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
