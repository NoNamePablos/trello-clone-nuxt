<script setup lang="ts">
  import { ref, h } from 'vue'
  import { PlusOutlined } from '#components'
  import type { KanbanItem } from '~/services/models'
  import dayjs from 'dayjs'
  import { nanoid } from 'nanoid'
  import type { Task } from 'nitropack/dist/runtime'

  const emits = defineEmits<{
    (e: 'add', payload: KanbanItem): void
  }>()

  const title = ref<string>('')

  const isEditing = ref(false)

  const toggleEditing = () => {
    isEditing.value = true
  }

  const createTask = (e: Event) => {
    if (title.value.trim()) {
      e.preventDefault()
      emits('add', {
        title: title.value.trim(),
        createdAt: dayjs().toString(),
        id: nanoid()
      } as Task)
    }
    isEditing.value = false
    title.value = ''
  }
</script>

<template>
  <div>
    <a-textarea
      v-if="isEditing"
      v-model:value="title"
      placeholder="Enter task name"
      :rows="4"
      @press-enter="createTask($event)"
    />
    <a-button v-else type="text" :icon="h(PlusOutlined)" class="w-full" @click="toggleEditing()"
      >Добавить карточку</a-button
    >
  </div>
</template>
