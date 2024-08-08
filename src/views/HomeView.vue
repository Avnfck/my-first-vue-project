<template>
  <div class="home">
    <PostCard
      v-for="item in posts"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :body="item.body"
      :author="item.author"
      @delete-post="deletePost"
    />
  </div>
  <PaginationControls class="pagination" />
</template>

<script>
// @ is an alias to /src
import PostCard from "@/components/PostCard.vue";
import PaginationControls from "@/components/PaginationControls.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeView",
  components: {
    PostCard,
    PaginationControls,
  },
  computed: {
    ...mapGetters(["getPaginetedPosts"]),

    posts() {
      return this.getPaginetedPosts;
    },
  },
  created() {
    this.$store.dispatch("fetchAllData");
  },
  methods: {
    ...mapActions(["removePost"]),
    deletePost(postId) {
      this.removePost(postId);
    },
  },
};
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  width: 90%;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    width: 70%;
  }

  @media (min-width: 1024px) {
    gap: 1rem;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: white;
}
</style>
