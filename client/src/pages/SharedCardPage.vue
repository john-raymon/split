<template>
  <div class="py-5 w-full flex items-center flex-col">
    <template v-if="isAuth">
      <!-- show card -->
      <div class="w-full">
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

export default {
  name: "SharedCardPage",
  components: {
    VirtualCard,
  },
  data() {
    return {
      isAuth: false,
      cardholder: null,
      token: null,
      step: "PRE_CHECK", // PRE_CHECK, SIGN_IN, SIGN_UP
      password: "",
      newPassword: "",
      card: {},
    };
  },
  methods: {
    fetchCardData() {
      // /users/cardholders/card?card_token=78e62b1a-4d83-453d-816f-1f84b3b06706
      const apiAgent = new ApiAgent("/api", "", false, this.token);
      apiAgent
        ._get(`/users/cardholders/card?card_token=${this.$route.params.cardToken}`)
        .then(body => {
          debugger;
          this.card = body.data[0];
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when fetching secure card data.", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    },
    onContinue() {
      const apiAgent = new ApiAgent("/api", "", false);
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
      const apiAgent = new ApiAgent("/api", "", false);
      apiAgent
        ._post("/users/cardholders/login", {
          email: this.$route.query.email,
          password: this.password,
        })
        .then(body => {
          this.token = body.cardholder.accessToken;
          this.cardholder = body.cardholder;
          this.isAuth = true;
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when loggin in cardholder.", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    },
    onSignUp() {
      const apiAgent = new ApiAgent("/api", "", false);
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
        })
        .catch(err => {
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
