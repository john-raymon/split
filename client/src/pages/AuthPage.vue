<template>
  <div class="py-5 w-full flex items-center flex-col">
    <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-start px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="tracking-wide pb-8 text-center text-gray-800">Sign up for early access</h1>
        <input
          type="text"
          class="text-field"
          name="first-name"
          placeholder="First name"
          v-model="firstName"
        />

        <input
          type="text"
          class="text-field"
          name="last-name"
          placeholder="Last name"
          v-model="lastName"
        />

        <input type="text" class="text-field" name="email" placeholder="Email" v-model="email" />

        <input
          type="password"
          class="text-field"
          name="password"
          placeholder="Password"
          v-model="password"
        />

        <button type="submit" class="button w-full" @click="onSubmit">
          Create Account
        </button>
      </div>

      <div class="text-white mt-6">
        Already have an account?
        <router-link class="no-underline border-b border-blue-500 text-blue-500" to="/sign-in">
          Log in
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "AuthPage",
  props: ["userAuth"],
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      billingAddressLine: "",
      billingCity: "",
      billingState: "",
      billingPostalCode: "",
      billingCountry: "",
      phoneNumber: "",
      dob: "",
      socialLastFour: "0000"
    };
  },
  watch: {
    userAuth: {
      handler(val) {
        if (val.isAuth) {
          const redirectRouteName = this.$route.query.redirect || "dashboard.homepage";
          return this.$router.push({ name: redirectRouteName, query: this.$route.query });
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["updateUserAuth"]),
    onSubmit() {
      this.$http
        ._post("/users", this.$data)
        .then(body => {
          return this.updateUserAuth({
            isAuth: true,
            user: body.user
          });
        })
        .catch(err => {
          if (err.response) {
            console.log("Error when attempting to create new user", err, err.response);
            return alert(JSON.stringify(err.response.data));
          }
        });
    }
  }
};
</script>
