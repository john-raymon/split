<template>
  <component @log-out="handleLogout" :is="layout" :userAuth="userAuth">
    <router-view :userAuth="userAuth" />
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
    ...mapState(["userAuth"])
  },
  watch: {
    userAuth: {
      handler: function(userAuth) {
        if (userAuth.isAuth) {
          this.fetchFundingSources(this.$http);
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(["logout", "fetchFundingSources"]),
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
