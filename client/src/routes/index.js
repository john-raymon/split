import VueRouter from "vue-router";
import Dashboard from "@/pages/Dashboard";
import NewCard from "@/pages/NewCard";
import AuthPage from "@/pages/AuthPage";
import SignInPage from "@/pages/SignInPage";
import HomePage from "@/pages/HomePage";
import AddFundingAccount from "@/pages/AddFundingAccount";
import ManageCard from "@/pages/ManageCard";
import DashboardHomepage from "@/pages/DashboardHomepage";
import store from "@/vuex";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage,
    meta: {
      layout: "dark-layout"
    }
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      requireUserAuth: true
    },
    children: [
      {
        name: "dashboard.homepage",
        path: "",
        component: DashboardHomepage
      },
      {
        name: "new-card",
        path: "card/new",
        component: NewCard
      },
      {
        name: "manage-card",
        path: "card/manage/:cardToken",
        component: ManageCard
      },
      {
        name: "add-funding-bank-account",
        path: "funding/add",
        component: AddFundingAccount
      }
    ]
  },
  {
    name: "sign-up",
    path: "/sign-up",
    component: AuthPage,
    meta: {
      layout: "dark-layout"
    }
  },
  {
    name: "sign-in",
    path: "/sign-in",
    component: SignInPage,
    meta: {
      layout: "dark-layout"
    }
  },
  {
    name: "secure",
    path: "/secure",
    alias: "/protected",
    component: {
      template: `
        <div>
          This is a protected page-component
        </div>
      `
    },
    meta: {
      requireUserAuth: true
    }
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach(async (to, from, next) => {
  const isUserAuth = store.state.userAuth.isAuth;

  if (to.matched.some(record => record.meta.requireUserAuth)) {
    // this route requires user auth, check if logged in
    // if not, redirect to register/login page.
    if (!isUserAuth) {
      next({
        name: "sign-in",
        query: { ...to.query, redirect: to.name }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
