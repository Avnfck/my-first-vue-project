import _ from "lodash";
import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    enrichedPosts: null,
    currentPage: 1,
    postsPerPage: 10,
  },

  mutations: {
    setEnrichedPosts(state, { posts, users }) {
      state.enrichedPosts = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return {
          ...post,
          author: user ? user.name : "Unknown",
        };
      });
    },

    increaseCurrentPage(state) {
      state.currentPage++;
    },

    decreaseCurrentPage(state) {
      state.currentPage--;
    },

    removePost(state, postId) {
      state.enrichedPosts = state.enrichedPosts.filter(
        (post) => post.id !== postId
      );

      const totalPages = Math.ceil(
        state.enrichedPosts.length / state.postsPerPage
      );
      if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
      }
    },
  },

  getters: {
    getPaginetedPosts(state) {
      if (state.enrichedPosts) {
        const startIndex = (state.currentPage - 1) * state.postsPerPage;
        const endIndex = startIndex + state.postsPerPage;

        return _.slice(state.enrichedPosts, startIndex, endIndex);
      }
      return [];
    },

    getCurrentPage(state) {
      return state.currentPage;
    },

    getTotalPages(state) {
      if (state.enrichedPosts) {
        return _.ceil(state.enrichedPosts.length / state.postsPerPage);
      }
      return 0;
    },
  },

  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = response.data;
        if (!Array.isArray(data)) {
          throw new Error("Posts data is not an array");
        }
        return data;
      } catch (e) {
        console.log("Failed to fetch posts data", e.message);
        throw e;
      }
    },

    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = response.data;
        if (!Array.isArray(data)) {
          throw new Error("Users data is not an array");
        }
        return data;
      } catch (e) {
        console.log("Failed to fetch users data", e.message);
        throw e;
      }
    },

    async fetchAllData({ dispatch, commit }) {
      try {
        const [posts, users] = await Promise.all([
          dispatch("fetchPosts"),
          dispatch("fetchUsers"),
        ]);

        commit("setEnrichedPosts", { posts, users });
      } catch (e) {
        console.log("Failed to fetch all data", e.message);
      }
    },

    removePost({ commit }, postId) {
      commit("removePost", postId);
    },
  },

  modules: {},
});
