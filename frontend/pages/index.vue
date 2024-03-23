<script setup lang="ts">
  import { ref } from 'vue'
  import type { KanbanColumn } from '~/services/models'
  import { nanoid } from 'nanoid'
  import dayjs from 'dayjs'
  import KanbanBoard from '~/components/KanbanBoard.vue'

  const columns = ref<KanbanColumn[]>([
    {
      title: 'Backlog',
      id: nanoid(),
      tasks: [
        {
          title: 'Загрузка файлов',
          id: nanoid(),
          createdAt: dayjs().toString()
        },
        {
          title: 'Campaign',
          id: nanoid(),
          createdAt: dayjs().toString()
        },
        {
          title: 'Add funds',
          id: nanoid(),
          createdAt: dayjs().toString()
        }
      ]
    },
    {
      title: 'Нужно сделать',
      id: nanoid(),
      tasks: [
        {
          title: 'удалить либу',
          id: nanoid(),
          createdAt: dayjs().toString()
        },
        {
          title: 'alert',
          id: nanoid(),
          createdAt: dayjs().toString()
        }
      ]
    },
    {
      title: 'В процессе',
      id: nanoid(),
      tasks: [
        {
          title: 'Рефакторинг адс',
          id: nanoid(),
          createdAt: dayjs().toString()
        }
      ]
    },
    {
      title: 'Готово',
      id: nanoid(),
      tasks: []
    }
  ])

  const updateColums = (newData: KanbanColumn[]) => {
    console.log('new data: ', newData)
    columns.value = newData
  }
</script>

<template>
  <div>
    <div class="text-white text-3xl font-bold"></div>
    <kanban-board :columns="columns" @update="updateColums($event)" />
  </div>
</template>

<style scoped></style>
