import Vue from "vue";
import vuex from "vuex";
import api from "../API/axiosConfig";
Vue.use(vuex);

const store = new vuex.Store({
  state: {
    loading: false,
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },

    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    TOGGLE_TASK(state, id) {
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = task.status === "todo" ? "done" : "todo";
      }
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        Vue.set(state.tasks, index, updatedTask);
      }
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await api.get("/tasks");
        commit("SET_TASKS", res.data);
        Vue.$toast.success("Tasks fetched successfully");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async addTask({ commit }, task) {
      commit("SET_LOADING", true);
      try {
        const res = await api.post("/tasks", task);
        commit("ADD_TASK", res.data);
        Vue.$toast.success("Task added successfully");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async deleteTask({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        await api.delete(`/tasks/${id}`);
        commit("DELETE_TASK", id);
        Vue.$toast.success("Task deleted successfully");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async toggleTask({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const task = this.state.tasks.find((t) => t.id === id);
        const res = await api.put(`/tasks/${task.id}`, {
          ...task,
          status: task.status === "todo" ? "done" : "todo",
        });
        commit("TOGGLE_TASK", res.data.id);
        Vue.$toast.success("Task updated successfully");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    async updateTask({ commit }, task) {
      commit("SET_LOADING", true);
      try {
        const res = await api.put(`/tasks/${task.id}`, task);
        commit("UPDATE_TASK", res.data);
        Vue.$toast.success("Task updated successfully");
      } catch (err) {
        Vue.$toast.error(err.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    allTasks: (state) =>
      [...state.tasks].sort((a, b) => {
        const order = { todo: 0, "in-progress": 1, done: 2 };
        return order[a.status] - order[b.status];
      }),
    todoTasks: (state) => state.tasks.filter((t) => t.status === "todo"),
    inProgressTasks: (state) =>
      state.tasks.filter((t) => t.status === "in-progress"),
    doneTasks: (state) => state.tasks.filter((t) => t.status === "done"),
  },
});

export default store;
