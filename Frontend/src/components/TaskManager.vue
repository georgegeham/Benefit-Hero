<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">
        Tasks ({{ filteredTasks.length }})
      </h2>

      <div class="flex gap-3 mb-4">
        <button @click="currentFilter = 'all'" :class="buttonClass('all')">
          All
        </button>
        <button @click="currentFilter = 'todo'" :class="buttonClass('todo')">
          To Do
        </button>
        <button
          @click="currentFilter = 'in-progress'"
          :class="buttonClass('in-progress')"
        >
          In Progress
        </button>
        <button @click="currentFilter = 'done'" :class="buttonClass('done')">
          Done
        </button>
      </div>
    </div>
    <div v-if="loading" class="text-center py-12 text-gray-400">
      <Spinner />
    </div>

    <div
      v-else-if="filteredTasks.length === 0 && !loading"
      class="text-center py-12 text-gray-400"
    >
      <FileText class="h-16 w-16 mx-auto mb-3" />
      <p class="text-lg">No tasks yet. Add your task above!</p>
    </div>

    <div v-else class="space-y-2">
      <TaskItem
        v-for="(task, index) in filteredTasks"
        :key="task.id"
        :task="task"
        :index="index"
        @delete="deleteTask"
        @toggle="toggleTask"
        @drag-start="handleDragStart"
        @drag-over="handleDragOver"
        @drop="handleDrop"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { FileText } from "lucide-vue";
import TaskItem from "./TaskItem.vue";
import Spinner from "./Spinner.vue";
import store from "../store";

onMounted(() => {
  store.dispatch("fetchTasks");
});

const tasks = computed(() => store.getters.allTasks);
const todoTasks = computed(() => store.getters.todoTasks);
const inProgressTasks = computed(() => store.getters.inProgressTasks);
const doneTasks = computed(() => store.getters.doneTasks);
const loading = computed(() => store.state.loading);

const currentFilter = ref("all");

const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case "todo":
      return todoTasks.value;
    case "in-progress":
      return inProgressTasks.value;
    case "done":
      return doneTasks.value;
    default:
      return tasks.value;
  }
});

function buttonClass(filter) {
  return [
    "px-3 py-1 rounded-md text-sm font-medium transition",
    currentFilter.value === filter
      ? "bg-indigo-500 text-white"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
  ];
}

const draggedIndex = ref(null);

function deleteTask(id) {
  store.dispatch("deleteTask", id);
}

function toggleTask(id) {
  store.dispatch("toggleTask", id);
}

function handleDragStart(index) {
  draggedIndex.value = index;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(index) {
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const draggedTask = tasks.value[draggedIndex.value];
    const newTasks = [...tasks.value];
    newTasks.splice(draggedIndex.value, 1);
    newTasks.splice(index, 0, draggedTask);
    store.commit("SET_TASKS", newTasks);
  }
  draggedIndex.value = null;
}
</script>
