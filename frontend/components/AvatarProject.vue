<script setup lang="ts">
  import { toRefs, computed } from 'vue'
  interface IProps {
    username: string
  }
  const props = defineProps<IProps>()
  const { username } = toRefs(props)
  const getInitials = (username: string): string => {
    let parts = username.split(/[ -]/)
    let initials = ''

    for (var i = 0; i < parts.length; i++) {
      initials += parts[i].charAt(0)
    }

    if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
      initials = initials.replace(/[a-z]+/g, '')
    }

    initials = initials.substr(0, 2).toUpperCase()

    return initials
  }

  const initialsUser = computed(() => {
    return getInitials(username.value)
  })
</script>

<template>
  <div
    class="w-8 h-8 rounded-sm bg-gradient-to-r from-[#9F8FEF] to-[#579dff] flex items-center justify-center font-bold text-xl text-black/70"
  >
    {{ initialsUser }}
  </div>
</template>

<style scoped></style>
