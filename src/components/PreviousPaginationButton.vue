<template>
  <button
    :class="[
      'px-4 py-2 mx-1 rounded-lg',
      isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
      'transition-colors duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    ]"
    :disabled="!isActive"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActive() {
      if (this.currentPage === 1) {
        return false;
      }
      return true;
    },
  },
};
</script>
