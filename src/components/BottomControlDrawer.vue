<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElDrawer } from 'element-plus'

const isMinimize = ref(true)

const toggleMinimize = () => {
  isMinimize.value = !isMinimize.value
}

const size = computed(() => {
  // NOTE: 24px is depend on .expand-area height
  return isMinimize.value ? '24px' : '50%'
})

</script>

<template>
  <ElDrawer
    :model-value="true"
    modal-class="bottom-control-drawer"
    direction="btt"
    :close-on-press-escape="false"
    :modal="false"
    :show-close="false"
    :size="size"
    :withHeader="false"
  >
    <div class="expand-area" @click="toggleMinimize">
      <div class="expand-bar"></div>
    </div>
    <slot></slot>
  </ElDrawer>
</template>

<style lang="scss">
.bottom-control-drawer {
  .el-drawer {
    @apply rounded-t-3xl;
  }

  .el-drawer__body {
    @apply p-0;
    @apply flex flex-col;
    @apply overflow-hidden;
  }
}
</style>

<style lang="scss" scoped>
  .expand-area {
    @apply h-6 w-full;
    @apply flex items-center justify-center;
    @apply cursor-pointer;
    @apply overflow-hidden;

    flex: 0 0 auto;

    &:hover {
      .expand-bar {
        @apply bg-gray-300;
      }
    }

    &:active {
      .expand-bar {
        @apply bg-gray-400;
      }
    }
  }

  .expand-bar {
    @apply w-20 h-1 rounded-1;
    @apply bg-gray-200;
  }
</style>
