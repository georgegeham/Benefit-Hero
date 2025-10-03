<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <Header />
    <main class="max-w-4xl mx-auto p-6 space-y-6">
      <Form />
      <TaskManager />
    </main>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import TaskManager from "./components/TaskManager.vue";
import Form from "./components/Form.vue";
</script>
