<script setup lang="ts">
  import type { KanbanColumn, KanbanItem } from '~/services/models'
  import { PlusOutlined } from '#components'
  import draggable from 'vuedraggable'
  import { toRefs, computed, h, nextTick, ref } from 'vue'
  import KanbanDragHandle from '~/components/KanbanDragHandle.vue'
  import type { ID } from '~/services/types'
  import { nanoid } from 'nanoid'

  interface IProps {
    columns: KanbanColumn[]
  }

  const props = defineProps<IProps>()
  const { columns } = toRefs(props)

  const emits = defineEmits<{
    (e: 'update', data: KanbanColumn[]): void
  }>()

  const boardList = computed({
    get() {
      console.log('colum: ', columns.value)
      return columns.value
    },
    set(newValue) {
      emits('update', newValue)
    }
  })

  const focused = ref(false)

  const createColumn = () => {
    const column: KanbanColumn = {
      id: nanoid(),
      tasks: [],
      title: ''
    }
    columns.value.push(column)
    nextTick(() => {
      ;(document.querySelector('.column:last-of-type .title-input') as HTMLInputElement).focus()
      focused.value = true
    })
  }

  const updateColumn = (e: Event) => {
    nextTick(() => {
      ;(e.target as HTMLInputElement).blur()
    })
    onChange()
  }

  const onChange = () => {
    emits('update', columns.value)
  }

  const addTask = (column: KanbanColumn, payload: KanbanItem) => {
    column.tasks.push(payload)
    onChange()
  }
  const deleteTask = (column: KanbanColumn, payload: ID): void => {
    column.tasks = column.tasks.filter(item => item.id !== payload)
    onChange()
  }
  const removeColumn = (column: KanbanColumn) => {
    if (column.title !== '') {
      const newCols = [...columns.value].filter(t => t.id !== column.id)
      emits('update', newCols)
    }
  }
</script>

<template>
  <div class="flex gap-4 overflow-x-auto items-start">
    <draggable
      v-model="boardList"
      group="columns"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="flex gap-4 items-start"
    >
      <template #item="{ element: column }: { element: KanbanColumn }">
        <div class="flex flex-col bg-gray-200 column p-2 rounded min-w-[250px] shadow-sm">
          <div class="font-bold mb-4 py-2 flex gap-1 items-center">
            <kanban-drag-handle />
            <a-input
              v-model:value="column.title"
              :bordered="false"
              class="title-input rounded focus:bg-white"
              @press-enter="updateColumn"
              @keydown.backspace="removeColumn(column)"
            />
          </div>
          <draggable
            v-model="column.tasks"
            group="tasks"
            item-key="id"
            handle=".drag-handle"
            :animation="150"
            @change="onChange"
          >
            <template #item="{ element: task }: { element: KanbanItem }">
              <div>
                <KanbanTask :task="task" @delete="deleteTask(column, $event)" />
              </div>
            </template>
          </draggable>
          <div class="flex flex-col gap-4">
            <kanban-new-task @add="addTask(column, $event)" />
          </div>
        </div>
      </template>
    </draggable>
    <div>
      <a-button type="dashed" :icon="h(PlusOutlined)" class="w-full" @click="createColumn"
        >Добавить колонку</a-button
      >
    </div>
  </div>
</template>
