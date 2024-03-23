import type { ID } from '~/services/types'

export interface KanbanColumn {
  title: string
  id: ID
  tasks: KanbanItem[]
}

export interface KanbanItem {
  title: string
  id: ID
  createdAt: string
}
