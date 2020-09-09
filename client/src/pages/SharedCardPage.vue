<template>
  <div class="py-5 w-full flex items-center flex-col">
    <template v-if="isAuth">
      <!-- show card -->
      <div v-if="error" class="w-full">
        <div class="text-gray-700 text-3xl">
          <span class="text-gray-800 font-bold">
            Oops,
          </span>
          <br />
          we're unable to share this virtual card with you right now. Please reach out to the card
          owner.
        </div>
      </div>
      <div v-else class="w-full">
        <div class="text-gray-700 text-3xl capitalize">
          <span class="text-gray-800 font-bold capitl">
            Hello,
          </span>
          <br />
          {{ cardownerName }} has shared a split virtual card with you.
        </div>
        <div class="card-wrapper max-w-md mx-auto my-12">
          <VirtualCard class="w-full" :card="card" />
        </div>
      </div>
    </template>
    <template v-else>
      <template v-if="step === 'PRE_CHECK'">
        <div class="bg-white max-w-sm px-6 py-4 rounded shadow-md text-black w-full">
          <h1 class="tracking-wide pb-6 text-center text-gray-800">Continue to shared card</h1>
          <input
            type="text"
            class="text-field"
            name="email"
            placeholder="Email"
            v-model="$route.query.email"
          />

          <button type="submit" class="capitalize button w-full font-normal" @click="onContinue">
            continue
          </button>
        </div>
      </template>
      <template v-else-if="step === 'SIGN_IN'">
        <div class="bg-white max-w-sm px-6 py-4 rounded shadow-md text-black w-full">
          <h1 class="tracking-wide pb-6 text-center text-gray-800">
            Sign in to view your shared virtual card
          </h1>
          <input
            type="text"
            class="text-field"
            name="email"
            disabled
            placeholder="Email"
            v-model="$route.query.email"
          />
          <input
            type="password"
            class="text-field"
            name="password"
            placeholder="password"
            v-model="password"
          />

          <button type="submit" class="capitalize button w-full font-normal" @click="onSignIn">
            sign in
          </button>
        </div>
      </template>
      <template v-else-if="step === 'SIGN_UP'">
        <div class="bg-white max-w-sm px-6 py-4 rounded shadow-md text-black w-full">
          <h1 class="tracking-wide pb-6 text-center text-gray-800">
            Finish setting up your cardholder account.
          </h1>
          <input
            type="text"
            class="text-field"
            name="email"
            disabled
            placeholder="Email"
            v-model="$route.query.email"
          />
          <input
            type="password"
            class="text-field"
            name="new-password"
            placeholder="Create a new password"
            v-model="newPassword"
          />

          <button type="submit" class="capitalize button w-full font-normal" @click="onSignUp">
            finish registering
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import ApiAgent from "@/plugins/agents";
import VirtualCard from "@/components/VirtualCard";
import { mapState, mapActions } from "vuex";

export default {
  name: "SharedCardPage",
  components: {
    VirtualCard
  },
  data() {
    return {
      error: null,
      isAuth: false,
      cardholder: null,
      token: null,
      step: "PRE_CHECK", // PRE_CHECK, SIGN_IN, SIGN_UP
      password: "",
      newPassword: "",
      card: {},
      cardownerName: ""
    };
  },
  created() {
    if (this.userAuth.isAuth) {
      this.logout();
    }
  },
  beforeDestroy() {
    this.logout();
  },
  computed: {
    ...mapState(["userAuth"])
  },
  methods: {
    ...mapActions(["logout"]),
    fetchCardData() {
      const apiAgent = new ApiAgent("/api");
      apiAgent
        ._get(`/users/cardholders/card?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          this.card = body.data[0];
          this.cardownerName = body.cardowner;
        })
        .catch(err => {
          this.error = err.response;
        });
    },
    onContinue() {
      const apiAgent = new ApiAgent("/api");
      apiAgent
        ._get(`/users/cardholders/check?email=${this.$route.query.email}`)
        .then(body => {
          this.step = body.hasOnBoarded ? "SIGN_IN" : "SIGN_UP";
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when checking cardholder on-board status", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    },
    onSignIn() {
      const apiAgent = new ApiAgent("/api");
      apiAgent
        ._post("/users/cardholders/login", {
          email: this.$route.query.email,
          password: this.password
        })
        .then(body => {
          this.token = body.cardholder.accessToken;
          this.cardholder = body.cardholder;
          this.isAuth = true;
          this.fetchCardData();
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when loggin in cardholder.", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    },
    onSignUp() {
      const apiAgent = new ApiAgent("/api");
      apiAgent
        ._post("/users/cardholders/onboard", {
          email: this.$route.query.email,
          password: this.newPassword,
          randomKey: this.$route.query.ref
        })
        .then(body => {
          this.token = body.cardholder.accessToken;
          this.cardholder = body.cardholder;
          this.isAuth = true;
          this.fetchCardData();
        })
        .catch(err => {
          this.step = "PRE_CHECK";
          if (err.response) {
            console.log("Error when on-boarding cardholder.", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    }
  }
  // watch: {
  //   isAuth: {
  //     handler(val, oldVal) {
  //       if (!val) {

  //       }
  //     },
  //     immediate: true,
  //   },
  // },
};
</script>
