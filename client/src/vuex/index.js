import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Agent from "@/plugins/agents";

Vue.use(Vuex);

// persist user state across refreshes and what-not
const persist = new VuexPersistence();

export default new Vuex.Store({
  state: {
    userAuth: {
      isAuth: false,
      user: null
    },
    fundingSources: []
  },
  mutations: {
    setUserAuth(state, userAuth) {
      state.userAuth = { ...userAuth, user: { ...userAuth.user, accessToken: undefined } };
    },
    resetAuth(state) {
      state.userAuth = {
        isAuth: false,
        user: null
      };
    },
    setFundingSources(state, fundingSources) {
      state.fundingSources = fundingSources;
    }
  },
  actions: {
    updateUserAuth(context, authData) {
      context.commit("setUserAuth", authData);
    },
    logout(context) {
      // clear jwt from localforage
      Agent.setToken("");
      return context.commit("resetAuth");
    },
    fetchFundingSources(context, userAgent) {
      userAgent
        ._get(
          `/users/fundingsources?account_token=${context.state.userAuth.user.privacyAccountToken}`
        )
        .then(body => {
          context.commit("setFundingSources", body.fundingSources);
        })
        .catch(err => {
          console.log("there was an error while dispatching the fetchFundingSources action");
          throw err;
        });
    }
  },
  plugins: [persist.plugin]
});
