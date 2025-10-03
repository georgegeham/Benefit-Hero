<template>
  <header class="bg-indigo-600 shadow-lg">
    <nav
      class="mx-auto flex h-full max-w-7xl items-center justify-center p-6 lg:px-8"
    >
      <div class="flex items-center gap-3">
        <ClipboardList class="h-8 w-8 text-white" />
        <h1 class="text-2xl font-bold text-white">
          Benefits Hero Task Manager
        </h1>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ClipboardList } from "lucide-vue";
</script>
