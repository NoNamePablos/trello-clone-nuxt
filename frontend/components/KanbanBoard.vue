<script setup lang="ts">
  import type { KanbanColumn, KanbanItem } from '~/services/models'
  import { PlusOutlined } from '#components'
  import draggable from 'vuedraggable'
  import { toRefs, computed } from 'vue'
  import KanbanDragHandle from '~/components/KanbanDragHandle.vue'

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

  const onChange = () => {
    emits('update', columns.value)
  }
</script>

<template>
  <div>
    <draggable
      v-model="boardList"
      group="columns"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="flex gap-4 overflow-x-auto items-start"
    >
      <template #item="{ element: column }: { element: KanbanColumn }">
        <div class="flex flex-col bg-gray-200 column p-2 rounded min-w-[250px] shadow-sm">
          <div class="font-bold mb-4 py-2 flex gap-1 items-center">
            <kanban-drag-handle />
            <div class="">{{ column.title }}</div>
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
                <KanbanTask :task="task" />
              </div>
            </template>
          </draggable>
          <div>
            <a-button type="text" :icon="h(PlusOutlined)" class="w-full"
              >Добавить карточку</a-button
            >
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
