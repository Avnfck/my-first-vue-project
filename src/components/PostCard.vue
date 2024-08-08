<template>
  <div
    class="card max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">Tytuł: {{ title }}</h3>
      <ShowMoreContainer :text="`${body}`" />
      <p class="text-gray-700 mb-4">Autor: {{ author }}</p>
      <button
        class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200 ease-in-out"
        @click="handleDelete"
      >
        Usuń
      </button>
    </div>
  </div>
</template>

<script>
import ShowMoreContainer from "@/components/ShowMoreContainer.vue";

export default {
  name: "PostCard",
  components: {
    ShowMoreContainer,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleDelete() {
      this.$emit("delete-post", this.id);
    },
  },
};
</script>

<style>
.card {
  margin: 0 2.5px 0 2.5px;
}
.p-4 {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;

  p {
    color: #4a5568;
    margin-bottom: 1rem;
    margin-top: auto;
  }
}
</style>
