<script setup lang="ts">
import { ref } from 'vue'
import { ElTabs, ElTabPane } from 'element-plus'
import { Icon } from '@iconify/vue'

const TABS_NAME = {
  LIST: 'LIST',
  SEARCH: 'SEARCH',
} as const

const activeName = ref(TABS_NAME.LIST)
</script>

<template>
  <ElTabs
    class="control-tabs"
    v-model="activeName"
    :stretch="true"
  >
    <ElTabPane :label="TABS_NAME.LIST" :name="TABS_NAME.LIST">
      <template #label>
        <Icon icon="material-symbols:list-alt-outline-rounded"></Icon>
      </template>
      <slot :name="TABS_NAME.LIST"></slot>
    </ElTabPane>
    <ElTabPane :label="TABS_NAME.SEARCH" :name="TABS_NAME.SEARCH">
      <template #label>
        <Icon icon="material-symbols:search"></Icon>
      </template>
      <slot :name="TABS_NAME.SEARCH"></slot>
    </ElTabPane>
  </ElTabs>
</template>

<style lang="scss" scoped>
.control-tabs {
  @apply h-full;
  @apply flex flex-col;
  @apply overflow-hidden;

  :deep(.el-tabs__item) {
    @apply text-2xl leading-none;

    &:not(.is-active) {
      @apply text-primary-black;
    }
  }

  :deep(.el-tabs__header) {
    @apply m-0;
  }

  :deep(.el-tabs__content) {
    @apply overflow-auto;
  }
}
</style>
