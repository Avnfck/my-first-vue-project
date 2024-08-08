<template>
  <div class="max-w-md mx-auto my-4 p-4 border rounded shadow">
    <p>
      {{ isExpanded ? text : truncatedText }}
    </p>
    <button class="mt-2 text-blue-500 hover:underline" @click="toggleText">
      {{ isExpanded ? "Pokaż mniej" : "Pokaż więcej" }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    truncatedText() {
      return this.text.length > 100
        ? this.text.substring(0, 100) + "..."
        : this.text;
    },
  },
  methods: {
    toggleText() {
      this.isExpanded = !this.isExpanded;
    },
  },
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Dodatkowe style, jeśli potrzebne */
</style>
