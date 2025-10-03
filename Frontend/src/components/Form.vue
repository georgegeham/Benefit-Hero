<template>
  <div v-if="!isFormOpen" class="flex justify-center">
    <button
      @click="isFormOpen = true"
      class="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
    >
      <Plus class="h-5 w-5" />
      Add New Task
    </button>
  </div>

  <div v-else-if="isFormOpen" class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Add New Task</h2>
      <button
        @click="closeForm"
        class="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <X class="h-6 w-6" />
      </button>
    </div>
    <form @submit.prevent="addTask" class="flex flex-col gap-3">
      <label for="task-title" class="text-gray-600">Task Title</label>
      <input
        v-model="newTaskTitle"
        id="task-title"
        type="text"
        autofocus
        placeholder="Enter task title..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label for="task-description" class="text-gray-600">Description</label>
      <textarea
        v-model="newTaskDescription"
        id="task-description"
        placeholder="Enter task description..."
        rows="3"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <label for="task-status" class="text-gray-600">Status</label>
      <select
        v-model="newTaskStatus"
        id="task-status"
        class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <button
        type="submit"
        class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Add Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { Plus, X } from "lucide-vue";
import { ref } from "vue";
import store from "../store";
const newTaskTitle = ref("");
const isFormOpen = ref(false);
const newTaskDescription = ref("");
const newTaskStatus = ref("todo");

const addTask = () => {
  if (newTaskTitle.value.trim()) {
    store.dispatch("addTask", {
      title: newTaskTitle.value,
      description: newTaskDescription.value,
      status: newTaskStatus.value,
    });
    closeForm();
  }
};

const closeForm = () => {
  newTaskTitle.value = "";
  newTaskDescription.value = "";
  newTaskStatus.value = "todo";
  isFormOpen.value = false;
};
</script>
