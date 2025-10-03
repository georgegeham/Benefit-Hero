<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">
      Tasks ({{ tasks.length }})
    </h2>

    <div v-if="tasks.length === 0" class="text-center py-12 text-gray-400">
      <FileText class="h-16 w-16 mx-auto mb-3" />
      <p class="text-lg">No tasks yet. Add your first task above!</p>
    </div>

    <div v-else class="space-y-2">
      <TaskItem
        v-for="(task, index) in tasks"
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
import store from "../store";
onMounted(() => {
  store.dispatch("fetchTasks");
});
const tasks = computed(() => store.getters.allTasks);

console.log(tasks.value);

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
