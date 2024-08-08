<template>
  <div
    class="pagination card max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 flex justify-between items-center"
  >
    <PreviousPaginationButton
      @click="$store.commit(`decreaseCurrentPage`)"
      :currentPage="currentPage"
    >
      &laquo; Previous
    </PreviousPaginationButton>
    <span class="text-gray-800">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <ForwardPaginationButton
      @click="$store.commit(`increaseCurrentPage`)"
      :currentPage="currentPage"
      :totalPages="totalPages"
    >
      Next &raquo;
    </ForwardPaginationButton>
  </div>
</template>

<script>
import PreviousPaginationButton from "./PreviousPaginationButton.vue";
import ForwardPaginationButton from "./ForwardPaginationButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { ForwardPaginationButton, PreviousPaginationButton },

  computed: {
    ...mapGetters(["getCurrentPage", "getTotalPages"]),

    currentPage() {
      return this.getCurrentPage;
    },

    totalPages() {
      return this.getTotalPages;
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1rem;
  margin-top: 0.3rem;
  background-color: white;
  position: sticky;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
}
</style>
