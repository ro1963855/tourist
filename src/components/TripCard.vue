<script setup lang="ts">
import { computed } from 'vue'
import { ElCard, ElImage } from 'element-plus'
import { format, parseISO, isValid } from 'date-fns'

const props = defineProps<{
  id: number
  tripName: string
  createAt: string
}>()

const normalizedCreateAt = computed(() => {
  const createDate = parseISO(props.createAt)
  if (!isValid(createDate)) { return null }

  return format(createDate, 'yyyy/MM/dd HH:mm:ss')
})

const imageUrl = computed(() => {
  // REF: https://picsum.photos/images
  // NOTE: 前面的圖片很醜
  const imageIndex = props.id + 10
  return new URL(`https://picsum.photos/id/${imageIndex}/160/160`).href
})
</script>

<template>
<ElCard class="trip-card" shadow="hover">
  <ElImage class="image" :src="imageUrl" fit="cover" />
  <div class="content">
    <span class="trip-name">{{ tripName }}</span>

    <div class="flex-1"></div>
    <time class="time">{{ `${$t("TripCard.create_at")}${normalizedCreateAt}` }}</time>
  </div>
</ElCard>
</template>

<style lang="scss" scoped>
.trip-card {
  @apply cursor-pointer;

  :deep(.el-card__body) {
    @apply flex gap-x-4;
  }

  .image {
    @apply w-40 h-40;

    flex: 0 0 auto;
  }

  .content {
    @apply flex flex-col;
    @apply text-primary-black text-base;

    flex: 1 1 100%;
  }
}
</style>
