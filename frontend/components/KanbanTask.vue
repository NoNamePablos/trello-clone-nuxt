<script setup lang="ts">
  import type { KanbanItem } from '~/services/models'

  interface IProps {
    task: KanbanItem
  }
  const props = defineProps<IProps>()
</script>

<template>
  <div
    :title="task.createdAt.toString()"
    class="task max-w-full bg-white p-2 mb-2 rounded shadow-sm flex gap-1 items-center"
  >
    <kanban-drag-handle />
    <span>{{ task.title }}</span>
  </div>
</template>

<style>
  .sortable-drag .task {
    transform: rotate(5deg);
  }
  .sortable-ghost .task {
    position: relative;
  }
  .sortable-ghost .task:after {
    content: '';
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300 rounded;
  }
</style>
