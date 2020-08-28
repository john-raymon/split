<template>
  <div class="fixed w-full h-full inset-0 bg-white update-card-container">
    <div v-if="loading">
      <!-- loading -->
    </div>
    <div v-else-if="error">
      <!-- error UI (e.g. not found) -->
    </div>
    <div v-else>
      <div class="card-wrapper max-w-sm mx-auto my-12">
        <VirtualCard :card.sync="card" />
      </div>
      <div class="card-transactions-container">
        <p class="w-full text-lg max-w-sm mx-auto my-4 pb-2 border-b-2 border-gray-200 text-gray-800">
          Card transactions
        </p>
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
    };
  },
  created() {
    this.fetchCard();
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
    fetchCard() {
      this.error = null;
      this.loading = true;
      // this.$http;
      this.$http
        ._get(`/users/cards?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          console.log(body);
          if (body.total_entries === 1) {
            this.card = body.data[0];
          };
        })
        .catch(err => {
          this.error = err;
          console.log("there was an error while querying for a specific virtual card");
        })
        .finally(() => {
          this.loading = false;
        })
    }
  }
};
</script>
