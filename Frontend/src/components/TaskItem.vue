<template>
  <div
    draggable="true"
    @dragstart="$emit('drag-start', index)"
    @dragover="$emit('drag-over', $event)"
    @drop="$emit('drop', index)"
    class="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg border-2 border-transparent hover:border-indigo-300 hover:bg-indigo-50 cursor-move transition-all"
    :class="{ 'opacity-50': task.completed }"
  >
    <div class="flex items-center justify-center w-8 h-8 text-gray-400">
      <GripVertical class="h-5 w-5" />
    </div>

    <button
      @click="$emit('toggle', task.id)"
      class="flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
      :class="
        task.completed
          ? 'bg-green-500 border-green-500'
          : 'border-gray-300 hover:border-indigo-500'
      "
    >
      <Check
        v-if="task.completed"
        class="h-4 w-4 text-white"
        stroke-width="3"
      />
    </button>

    <!-- Task Content -->
    <div class="flex-1">
      <!-- Title -->
      <input
        type="text"
        v-model="localTask.title"
        :readonly="!editing"
        class="w-full text-gray-800 font-medium rounded-md transition-colors"
        :class="[
          task.completed ? 'line-through text-gray-400' : '',
          editing
            ? 'bg-white border px-2 py-1 border-gray-300'
            : 'bg-transparent',
        ]"
      />

      <span
        v-if="!editing && task.description"
        class="block text-xs text-gray-600"
      >
        {{ task.description }}
      </span>

      <textarea
        v-else-if="editing"
        v-model="localTask.description"
        class="block text-sm text-gray-700 my-2 p-2 w-full rounded-md border border-gray-300 bg-white"
      />

      <!-- Status -->
      <span
        v-if="!editing"
        class="inline-block text-xs px-2 py-1 rounded-full mt-2"
        :class="{
          'bg-blue-100 text-blue-700': task.status === 'todo',
          'bg-yellow-100 text-yellow-700': task.status === 'in-progress',
          'bg-green-100 text-green-700': task.status === 'done',
        }"
      >
        {{
          task.status === "todo"
            ? "To Do"
            : task.status === "in-progress"
            ? "In Progress"
            : "Done"
        }}
      </span>

      <select
        v-else
        v-model="localTask.status"
        class="mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>

    <button
      @click="toggleEdit"
      class="flex-shrink-0 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
    >
      <template v-if="editing">
        <Check class="h-5 w-5" />
      </template>
      <template v-else>
        <Pencil class="h-5 w-5" />
      </template>
    </button>

    <button
      @click="$emit('delete', task.id)"
      class="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
    >
      <Trash2 class="h-5 w-5" />
    </button>
  </div>
</template>

<script setup>
import { GripVertical, Check, Trash2, Pencil } from "lucide-vue";
import { ref } from "vue";

const { task, index } = defineProps({
  task: { type: Object, required: true },
  index: { type: Number, required: true },
});

const editing = ref(false);
const localTask = ref({ ...task });

function toggleEdit() {
  if (editing.value) {
    Object.assign(task, localTask.value);
  } else {
    localTask.value = { ...task };
  }
  editing.value = !editing.value;
}
</script>
