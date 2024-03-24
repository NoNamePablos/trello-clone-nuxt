<script setup lang="ts">
  import type { KanbanItem } from '~/services/models'
  import { ref, toRefs } from 'vue'
  import { onKeyStroke } from '@vueuse/core'
  import type { ID } from '~/services/types'

  interface IProps {
    task: KanbanItem
  }
  const props = defineProps<IProps>()
  const { task } = toRefs(props)

  const focused = ref(false)

  const emits = defineEmits<{
    (e: 'delete', payload: ID): void
  }>()

  onKeyStroke('Backspace', () => {
    if (focused.value) {
      emits('delete', task.value.id)
    }
  })
</script>

<template>
  <div
    :title="task.createdAt.toString()"
    class="task max-w-full bg-white p-2 mb-2 rounded shadow-sm flex gap-1 items-center"
    tabindex="0"
    @focus="focused = true"
    @blur="focused = false"
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
  .task:focus,
  .task:focus-visible {
    @apply outline-gray-400 !important;
    outline: gray auto 1px;
  }
</style>
