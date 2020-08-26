<template>
  <div class="base-switch" :class="{ 'base-switch--toggled': toggled }">
    <label
      v-if="$slots.default && prefixLabel"
      :for="id"
      class="base-switch__label base-switch__label--prefixed"
      @click.prevent="handleToggle"
    >
      <slot />
    </label>
    <div class="base-switch__container" @click.stop="handleToggle">
      <div class="base-switch__thumb">
        <input
          class="base-switch__input"
          type="checkbox"
          v-bind="{ id, name, disabled, checked: toggled, required }"
        />
      </div>
    </div>
    <label
      v-if="$slots.default && !prefixLabel"
      :for="id"
      class="base-switch__label"
      @click.prevent="handleToggle"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseSwitch",
  model: {
    prop: "toggled",
    event: "input"
  },
  props: {
    /**
     * Name of the checkbox
     */
    name: {
      type: String,
      default: ""
    },
    /**
     * Used to determine if the switch is toggled
     */
    value: {
      type: String,
      default: ""
    },
    /**
     * States whether element is required
     */
    required: Boolean,
    /**
     * Disables the switch
     */
    disabled: Boolean,
    /**
     * Check if checkbox is checked.
     */
    toggled: Boolean,
    /**
     * Whether to prefix the label (rather than display it after the switch)
     */
    prefixLabel: Boolean
  },
  computed: {
    id() {
      return Math.random();
    }
  },
  methods: {
    handleToggle() {
      this.$emit("input", !this.toggled);
    }
  }
};
</script>

<style scoped lang="scss">
.base-switch {
  @apply relative w-auto flex items-center cursor-pointer;

  &__container {
    @apply relative flex items-center w-10 h-5 rounded-full bg-gray-300 p-px;
  }

  &__thumb {
    @apply relative w-4 h-4 rounded-full bg-white mx-px cursor-pointer transition-all duration-300 ease-in-out;
  }

  &__label {
    @apply relative pl-2 cursor-pointer;

    &--prefixed {
      @apply pl-0 pr-2;
    }
  }

  &__input {
    left: -999em;
    position: absolute;
  }

  &--toggled {
    .base-switch__container {
      @apply bg-green-400;
    }

    .base-switch__thumb {
      transform: translate3d(20px, 0, 0);
    }
  }
}
</style>
