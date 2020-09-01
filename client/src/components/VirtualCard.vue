<template>
  <div class="shadow-sm hover:shadow-xl rounded-xl">
    <div class="virtual-debit-card-container">
      <div class="virtual-debit-card-container__contents flex flex-col items-center justify-center">
        <div
          class="text-lg text-gray-100 text-tracking-wider text-center w-full px-10 flex-grow flex flex-col justify-between py-8"
        >
          <p class="text-white text-xs text-left">
            {{ card.memo }}
          </p>
          <div>
            <p class="flex justify-between">
              <template v-if="!showInfo">
                <span class="text-gray-500">
                  {{ `&#9679;&#9679;&#9679;&#9679;` }}
                </span>
                <span class="text-gray-500">
                  {{ `&#9679;&#9679;&#9679;&#9679;` }}
                </span>
                <span class="text-gray-500">
                  {{ `&#9679;&#9679;&#9679;&#9679;` }}
                </span>
                {{ card.last_four }}
              </template>
              <template v-else>
                <span>
                  {{ `${card.pan[0]}${card.pan[1]}${card.pan[2]}${card.pan[3]}` }}
                </span>
                <span>
                  {{ `${card.pan[4]}${card.pan[5]}${card.pan[6]}${card.pan[7]}` }}
                </span>
                <span>
                  {{ `${card.pan[8]}${card.pan[9]}${card.pan[10]}${card.pan[11]}` }}
                </span>
                <span>
                  {{ card.last_four }}
                </span>
              </template>
            </p>
            <div class="flex justify-between items-center">
              <button
                @click="toggleShowInfo"
                class="focus:outline-none focus:text-yellow-200 hover:text-yellow-200 tracking-widest text-xs text-yellow-100 text-right w-auto float-left"
              >
                {{ showInfo ? "Hide" : "Show" }} info & cvv
              </button>
              <p v-if="showInfo" class="text-white text-sm">CVV: {{ card.cvv }}</p>
            </div>
          </div>
          <div class="flex flex-row justify-between items-end text-right">
            <div class="text-left text-xs">
              <p>
                {{
                  card.type === "SINGLE_USE"
                    ? "One-time use card"
                    : card.type === "UNLOCKED"
                    ? "Can be used anywhere"
                    : "Locked to merchant"
                }}
              </p>
              <p>
                {{
                  card.spend_limit > 0
                    ? `$${(card.spend_limit / 100).toFixed(2)} ${card.spend_limit_duration} limit`
                    : "Unlimited spending"
                }}
                <!-- we can also show state showing there is no limit set -->
              </p>
            </div>
            <div class="text-sm text-right">
              <p class="text-gray-500">
                Expires
              </p>
              <p>{{ card.exp_month }}/{{ card.exp_year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-controls">
      <div class="flex items-center justify-between text-xs flex-row py-5">
        <BaseSwitch
          v-if="card.state !== 'CLOSED'"
          @input="e => handleCardToggle(card.token, e)"
          :toggled="card.state === 'OPEN'"
        >
          <span class="text-gray-400">
            On / Off
          </span>
        </BaseSwitch>

        <p v-if="card.state === 'CLOSED'" class="text-red-500">
          This card has been closed.
        </p>

        <router-link
          v-if="$route.name !== 'manage-card'"
          :to="`/dashboard/card/manage/${card.token}`"
          class="flex items-center"
        >
          <div class="inline-block w-4 h-4 mr-1 fill-current">
            <svg width="100%" height="100%" viewBox="0 0 13 13">
              <path
                d="M5.6875 7.71875C5.60718 7.71871 5.52867 7.69487 5.4619 7.65023C5.39513 7.60558 5.34308 7.54215 5.31235 7.46794C5.28162 7.39373 5.27357 7.31208 5.28923 7.2333C5.30489 7.15452 5.34355 7.08215 5.40033 7.02533L9.41053 3.01514C9.20299 2.90245 8.97053 2.84353 8.73438 2.84375H2.64062C2.26364 2.84415 1.90222 2.99409 1.63565 3.26065C1.36909 3.52722 1.21915 3.88864 1.21875 4.26563V10.3594C1.21915 10.7364 1.36909 11.0978 1.63565 11.3644C1.90222 11.6309 2.26364 11.7808 2.64062 11.7813H8.73438C9.11136 11.7808 9.47278 11.6309 9.73935 11.3644C10.0059 11.0978 10.1558 10.7364 10.1562 10.3594V4.26563C10.1565 4.02947 10.0975 3.79701 9.98486 3.58947L5.97467 7.59967C5.93703 7.63749 5.89228 7.66748 5.84299 7.68792C5.7937 7.70836 5.74086 7.71884 5.6875 7.71875Z"
              />
              <path
                d="M11.375 1.21875H8.53125C8.42351 1.21875 8.32017 1.26155 8.24399 1.33774C8.1678 1.41392 8.125 1.51726 8.125 1.625C8.125 1.73274 8.1678 1.83608 8.24399 1.91226C8.32017 1.98845 8.42351 2.03125 8.53125 2.03125H10.3942L9.41053 3.01514C9.65344 3.14708 9.85292 3.34657 9.98486 3.58947L10.9688 2.60584V4.46875C10.9688 4.57649 11.0116 4.67983 11.0877 4.75601C11.1639 4.8322 11.2673 4.875 11.375 4.875C11.4827 4.875 11.5861 4.8322 11.6623 4.75601C11.7384 4.67983 11.7812 4.57649 11.7812 4.46875V1.625C11.7812 1.51726 11.7384 1.41392 11.6623 1.33774C11.5861 1.26155 11.4827 1.21875 11.375 1.21875Z"
              />
            </svg>
          </div>
          Manage card
        </router-link>

        <template v-if="$route.name === 'manage-card'">
          <button
            v-if="card.state !== 'CLOSED'"
            @click="e => handleCardClose(card.token, e)"
            class="focus:outline-none hover:text-red-400 focus:text-red-400 flex items-center text-red-500 p-1"
          >
            <div class="inline-block w-3 h-3 mr-1">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 384 448"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M47.0019 64.0311C55.8213 63.4799 63.4176 70.1826 63.9688 79.0019L83.9688 399.002C83.9725 399.061 83.9759 399.12 83.9789 399.179C84.5322 409.947 91.6813 416 100 416H284C292.237 416 299.354 410.082 300.03 399.024L320.031 79.0019C320.582 70.1826 328.179 63.4799 336.998 64.0311C345.817 64.5824 352.52 72.1787 351.969 80.998L331.97 400.976L331.97 400.979C330.385 426.899 311.102 448 284 448H100C73.1515 448 53.4161 427.084 52.0261 400.917L32.0312 80.998C31.4799 72.1787 38.1826 64.5824 47.0019 64.0311Z"
                  fill="#F56565"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 80C0 71.1634 7.16344 64 16 64H368C376.837 64 384 71.1634 384 80C384 88.8365 376.837 96 368 96H16C7.16344 96 0 88.8365 0 80Z"
                  fill="#F56565"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M151.953 31.9999C150.908 31.9969 149.872 32.2005 148.906 32.5991C147.94 32.9977 147.062 33.5834 146.323 34.3225C145.583 35.0616 144.998 35.9396 144.599 36.9059C144.2 37.8723 143.997 38.9078 144 39.9531L144 40V80C144 88.8365 136.837 96 128 96C119.163 96 112 88.8365 112 80V40.0204C111.988 34.766 113.013 29.5609 115.017 24.7034C117.024 19.8377 119.973 15.4169 123.695 11.6951C127.417 7.97334 131.838 5.02411 136.703 3.01703C141.561 1.01331 146.766 -0.0119346 152.02 -1.93947e-05H231.98C237.234 -0.0119346 242.439 1.01331 247.297 3.01703C252.162 5.02409 256.583 7.9733 260.305 11.6951C264.027 15.4169 266.976 19.8378 268.983 24.7034C270.987 29.5619 272.012 34.7682 272 40.0237V80C272 88.8365 264.837 96 256 96C247.163 96 240 88.8365 240 80V40L240 39.9531C240.003 38.9079 239.8 37.8723 239.401 36.9059C239.002 35.9396 238.417 35.0616 237.677 34.3225C236.938 33.5834 236.06 32.9977 235.094 32.5991C234.128 32.2005 233.092 31.9969 232.047 31.9999L232 32H152L151.953 31.9999Z"
                  fill="#F56565"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M192 128C200.837 128 208 135.163 208 144V368C208 376.837 200.837 384 192 384C183.163 384 176 376.837 176 368V144C176 135.163 183.163 128 192 128Z"
                  fill="#F56565"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M119.429 128.01C128.26 127.695 135.674 134.598 135.99 143.429L143.99 367.429C144.305 376.26 137.402 383.674 128.571 383.99C119.74 384.305 112.326 377.402 112.01 368.571L104.01 144.571C103.695 135.74 110.598 128.326 119.429 128.01Z"
                  fill="#F56565"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M264.571 128.01C273.402 128.326 280.305 135.74 279.99 144.571L271.99 368.571C271.674 377.402 264.26 384.305 255.429 383.99C246.598 383.674 239.695 376.26 240.01 367.429L248.01 143.429C248.326 134.598 255.74 127.695 264.571 128.01Z"
                  fill="#F56565"
                />
              </svg>
            </div>
            Close card
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSwitch from "@/components/ui/BaseSwitch";
import { mapActions } from "vuex";

export default {
  name: "VirtualCard",
  props: {
    card: Object
  },
  components: {
    BaseSwitch
  },
  data() {
    return {
      showInfo: false
    };
  },
  methods: {
    ...mapActions(["updateVirtualDebitCard"]),
    handleCardToggle(cardToken, newSwitchState) {
      const requestedCardState = newSwitchState ? "OPEN" : "PAUSED";
      this.updateVirtualDebitCard({
        userAgent: this.$http,
        updatedCardData: {
          card_token: cardToken,
          state: requestedCardState
        }
      }).then(newCardData => {
        this.$emit("update:card", newCardData);
      });
    },
    handleCardClose(cardToken) {
      if (
        window.confirm(
          "Are you sure you want to do this? The card will no longer approve authorizations. Closing a card cannot be undone."
        )
      ) {
        const requestedCardState = "CLOSED";
        this.updateVirtualDebitCard({
          userAgent: this.$http,
          updatedCardData: {
            card_token: cardToken,
            state: requestedCardState
          }
        }).then(newCardData => {
          this.$emit("update:card", newCardData);
        });
      }
    },
    toggleShowInfo() {
      this.showInfo = !this.showInfo;
    }
  }
};
</script>
<style scoped lang="scss">
.virtual-debit-card-container {
  @apply relative w-full bg-black rounded-xl text-gray-200;
  padding-bottom: 60%;
  &__contents {
    @apply absolute inset-0;
  }
}
.card-controls {
  @apply w-full -mt-6 pt-6 px-6 bg-gray-900 rounded-bl-xl rounded-br-xl text-white;
}
</style>
