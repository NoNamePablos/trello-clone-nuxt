<script lang="ts" setup>
  import { ref } from 'vue'
  import { MenuFoldOutlined, MenuUnfoldOutlined } from '#components'
  import AvatarProject from '~/components/AvatarProject.vue'

  const collapsed = ref<boolean>(false)

  const projectName = ref('Clickadilla Frontend')
</script>
<template>
  <div class="h-screen flex">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible width="250">
        <div class="flex p-2 text-white justify-between items-center">
          <div class="flex items-center gap-3">
            <avatar-project :username="projectName" />
            <div v-if="!collapsed" class="text-gray-300 text-md font-medium whitespace-nowrap">
              {{ projectName }}
            </div>
          </div>
          <div>
            <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
            />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </div>
        </div>
        <a-divider class="m-0 border-gray-400" />
        <a-menu theme="dark">
          <a-menu-item key="1">
            <user-outlined />
            <span>nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <video-camera-outlined />
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout class="bg-emerald-500 w-full h-full flex flex-col">
        <div class="h-12 bg-emerald-700 flex items-center py-2 px-4">
          <div class="text-white font-bold text-lg">
            {{ projectName }}
          </div>
        </div>
        <div class="px-4 mt-2 h-full">
          <slot />
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>
<style></style>
