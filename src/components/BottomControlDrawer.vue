<script setup lang="ts">
import { ElDrawer } from 'element-plus'
</script>

<template>
  <ElDrawer
    modal-class="bottom-control-drawer"
    direction="btt"
    :close-on-press-escape="false"
    :modal="false"
    :show-close="false"
    size="50%"
    :withHeader="false"
  >
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
  }
}
</style>
