<script setup lang="ts">
  import { GripVertical } from 'lucide-vue-next'
  import { h } from 'vue'
</script>

<template>
  <span class="drag-handle flex items-center justify-center cursor-move">
    <component :is="h(GripVertical)" size="16" />
  </span>
</template>

<style scoped></style>
