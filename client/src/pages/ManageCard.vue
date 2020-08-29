<template>
  <div class="fixed overflow-y-auto py-4 w-full h-full inset-0 bg-white update-card-container">
    <div v-if="loading">
      <!-- loading -->
    </div>
    <div v-else-if="error">
      <!-- error UI (e.g. not found) -->
    </div>
    <div class="w-full" v-else>
      <div class="card-wrapper max-w-sm mx-auto my-12">
        <VirtualCard :card.sync="card" />
      </div>
      <div class="card-transactions-container max-w-sm mx-auto">
        <p class="w-full text-lg my-4 pb-2 border-b-2 border-gray-200 text-gray-800">
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
  name: "NewCard",
  components: {
    VirtualCard
  },
  data() {
    return {
      loading: true,
      card: {},
      error: null,
      transactions: []
    };
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
    }
  },
  methods: {
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
      this.loading = true;
      return this.$http
        ._get(`/users/cards?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          console.log(body);
          if (body.total_entries === 1) {
            this.card = body.data[0];
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
