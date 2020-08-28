import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Agent from "@/plugins/agents";

Vue.use(Vuex);

// persist user state across refreshes and what-not
const persist = new VuexPersistence({
  reducer: state => ({ userAuth: state.userAuth })
});

export default new Vuex.Store({
  state: {
    userAuth: {
      isAuth: false,
      user: null,
      earlyAccess: true
    },
    fundingSources: [],
    virtualDebitCards: {
      data: [],
      page: 1,
      total_entries: 0,
      total_pages: 0
    }
  },
  mutations: {
    setUserAuth(state, userAuth) {
      state.userAuth = {
        ...state.userAuth,
        ...userAuth,
        user: { ...userAuth.user, accessToken: undefined }
      };
    },
    resetAuth(state) {
      state.userAuth = {
        isAuth: false,
        user: null,
        earlyAccess: true
      };
    },
    setFundingSources(state, fundingSources) {
      state.fundingSources = fundingSources;
    },
    setVirtualDebitCards(state, payload) {
      state.virtualDebitCards = payload;
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
        ._get(`/users/fundingsources`)
        .then(body => {
          context.commit("setFundingSources", body.fundingSources);
        })
        .catch(err => {
          console.log("there was an error while dispatching the fetchFundingSources action");
          throw err;
        });
    },
    fetchVirtualDebitCards(context, userAgent) {
      userAgent
        ._get(`/users/cards`)
        .then(body => {
          context.commit("setVirtualDebitCards", body);
        })
        .catch(err => {
          console.log("there was an error while dispatching the fetchVirtualDebitCards action");
          throw err;
        });
    },
    updateVirtualDebitCard(context, { userAgent, updatedCardData }) {
      return userAgent
        ._put(`/users/cards`, updatedCardData)
        .then((body) => {
          context.dispatch("fetchVirtualDebitCards", userAgent);
          return body;
        })
        .catch(err => {
          console.log("there was an error while dispatching the fetchVirtualDebitCards action");
          throw err;
        });
    }
  },
  plugins: [persist.plugin]
});
