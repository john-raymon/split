<template>
  <div class="homepage">
    <div class="homepage__hero relative flex flex-col justify-center">
      <div
        class="w-full max-800 center flex-column items-center justify-center-ns h-full min-h-screen p-2 bg-white flex justify-center"
      >
        <button
          v-if="!hidePlay"
          @click="handlePlay"
          class="cursor-pointer w-50 mx-auto absolute z-20 focus:opacity-50 focus:outline-none bg-transparent outline-transparent b--transparent"
          id="click-me"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 160 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.752 0.800049C12.936 0.800049 14.832 1.16005 16.44 1.88005C18.072 2.60005 19.32 3.63205 20.184 4.97605C21.048 6.32005 21.48 7.91605 21.48 9.76405C21.48 11.588 21.048 13.1841 20.184 14.5521C19.32 15.8961 18.072 16.928 16.44 17.648C14.832 18.368 12.936 18.7281 10.752 18.7281H5.06403V26H0.384033V0.800049H10.752ZM10.536 14.7681C12.576 14.7681 14.124 14.3361 15.18 13.4721C16.236 12.6081 16.764 11.372 16.764 9.76405C16.764 8.15605 16.236 6.92005 15.18 6.05605C14.124 5.19205 12.576 4.76005 10.536 4.76005H5.06403V14.7681H10.536Z"
              fill="#4C51BF"
            />
            <path
              d="M10.752 0.800049C12.936 0.800049 14.832 1.16005 16.44 1.88005C18.072 2.60005 19.32 3.63205 20.184 4.97605C21.048 6.32005 21.48 7.91605 21.48 9.76405C21.48 11.588 21.048 13.1841 20.184 14.5521C19.32 15.8961 18.072 16.928 16.44 17.648C14.832 18.368 12.936 18.7281 10.752 18.7281H5.06403V26H0.384033V0.800049H10.752ZM10.536 14.7681C12.576 14.7681 14.124 14.3361 15.18 13.4721C16.236 12.6081 16.764 11.372 16.764 9.76405C16.764 8.15605 16.236 6.92005 15.18 6.05605C14.124 5.19205 12.576 4.76005 10.536 4.76005H5.06403V14.7681H10.536Z"
              fill="url(#paint0_linear)"
            />
            <path
              d="M48.1136 0.800049H52.7936V22.0401H65.9696V26H48.1136V0.800049Z"
              fill="#4C51BF"
            />
            <path
              d="M48.1136 0.800049H52.7936V22.0401H65.9696V26H48.1136V0.800049Z"
              fill="url(#paint1_linear)"
            />
            <path
              d="M108.144 20.168H95.5441L93.0601 26H88.2361L99.5761 0.800049H104.184L115.56 26H110.664L108.144 20.168ZM106.596 16.4961L101.844 5.48005L97.1281 16.4961H106.596Z"
              fill="#4C51BF"
            />
            <path
              d="M108.144 20.168H95.5441L93.0601 26H88.2361L99.5761 0.800049H104.184L115.56 26H110.664L108.144 20.168ZM106.596 16.4961L101.844 5.48005L97.1281 16.4961H106.596Z"
              fill="url(#paint2_linear)"
            />
            <path
              d="M150.085 17.1081V26H145.405V17.18L135.505 0.800049H140.509L147.889 13.076L155.341 0.800049H159.949L150.085 17.1081Z"
              fill="#4C51BF"
            />
            <path
              d="M150.085 17.1081V26H145.405V17.18L135.505 0.800049H140.509L147.889 13.076L155.341 0.800049H159.949L150.085 17.1081Z"
              fill="url(#paint3_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="36.0956"
                y1="6.8072"
                x2="72.9596"
                y2="35.3185"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#667EEA" />
                <stop offset="1" stop-color="#553C9A" />
              </linearGradient>
              <linearGradient
                id="paint1_linear"
                x1="36.0956"
                y1="6.8072"
                x2="72.9596"
                y2="35.3185"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#667EEA" />
                <stop offset="1" stop-color="#553C9A" />
              </linearGradient>
              <linearGradient
                id="paint2_linear"
                x1="36.0956"
                y1="6.8072"
                x2="72.9596"
                y2="35.3185"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#667EEA" />
                <stop offset="1" stop-color="#553C9A" />
              </linearGradient>
              <linearGradient
                id="paint3_linear"
                x1="36.0956"
                y1="6.8072"
                x2="72.9596"
                y2="35.3185"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#667EEA" />
                <stop offset="1" stop-color="#553C9A" />
              </linearGradient>
            </defs>
          </svg>
        </button>
        <div class="absolute bg-transparent absolute bottom-0 mb-10 md:px-10 z-10 w-full">
          <form
            class="w-full flex flex-column justify-center items-center bg-gray-200 rounded-l-lg"
            action=""
            method="POST"
          >
            <div class="text-gray-700 w-2/3 bg-transparent rounded-l-lg">
              <input
                v-model="recipientEmail"
                required
                type="email"
                name="email"
                class="bg-transparent w-full p-3 focus:outline-none"
                placeholder="What's your email?"
              />
            </div>
            <div class="w-1/3">
              <button
                @click.prevent="handleFormSubmit"
                class="w-full text-white p-3 bg-indigo-200 rounded-lg hover:bg-indigo-800 focus:bg-indigo-800 shadow-2xl text-center bg-indigo-900"
                type="submit"
              >
                Join the waitlist.
              </button>
            </div>
          </form>
        </div>

        <video @click="handleVideoClick" ref="video-player" reload="auto" playsinline id="video" class="w-100 h-auto">
          <source src="@/assets/media/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Homepage",
  data() {
    return {
      hidePlay: false,
      recipientEmail: ""
    };
  },
  mounted() {
    this.$refs['video-player'].addEventListener('ended', () => {
      this.hidePlay = false;
    })
  },
  methods: {
    handlePlay() {
      this.hidePlay = true;
      this.$refs['video-player'].play();
    },
    handleVideoClick() {
      this.hidePlay = false;
      this.$refs['video-player'].pause();
    },
    handleFormSubmit() {
      this.$http
        ._post("/users/waiting-list/sign-up", {
          to: this.recipientEmail
        })
        .then(() => {
          this.recipientEmail = '';
          alert("You've been added to the waiting list! Thank you for signing up.");
        });
    }
  }
};
</script>
<style lang="scss">
.homepage {
  @apply w-full h-auto mb-10;
}
</style>
