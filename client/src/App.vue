<template>
  <component @log-out="handleLogout" :is="layout" :userAuth="userAuth">
    <router-view :userAuth="userAuth" :virtualDebitCards="virtualDebitCards" />
  </component>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
    ...mapState(["userAuth", "virtualDebitCards"])
  },
  watch: {
    userAuth: {
      handler: function(userAuth) {
        if (userAuth.isAuth) {
          this.fetchFundingSources(this.$http);
          this.fetchVirtualDebitCards(this.$http);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["logout", "fetchFundingSources", "fetchVirtualDebitCards"]),
    handleLogout() {
      this.logout().then(() => {
        this.$nextTick().then(() => {
          this.$router.push({ name: "sign-in" });
        });
      });
    }
  }
};
</script>
