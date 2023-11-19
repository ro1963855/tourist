<script setup lang="ts">
import { ElImage, ElButton } from 'element-plus'
import { Icon } from '@iconify/vue'
import { SearchResult } from '@/models/SearchResult'

defineProps<{
  searchResult: SearchResult
  isSave: boolean
}>()

const StarType = {
  Full: 'Full',
  Half: 'Half',
  Empty: 'Empty',
} as const

const starType = (rating: number, startIndex: number) => {
  const difference = rating - startIndex
  if (difference >= 0) {
    return StarType.Full
  }

  if (difference >= -0.5) {
    return StarType.Half
  }

  return StarType.Empty
}
</script>

<template>
  <div class="search-result-card">
    <ElImage
      class="cover-image"
      :lazy="true"
      fit="cover"
      :src="searchResult.coverUrl"
    >
      <template #error>
        <div class="failed-image">
          <Icon icon="material-symbols:imagesmode-rounded"></Icon>
        </div>
      </template>
    </ElImage>
    <div class="content">
      <div class="marker-name">{{ searchResult.name }}</div>
      <div class="marker-rating mb-2">
        <span class="mr-2">{{ searchResult.rating }}</span>
        <span v-for="index in 5" :key="index" class="rating-star">
          <template v-if="starType(searchResult.rating, index + 1) === StarType.Full">
            <Icon class="text-warning" icon="material-symbols:star-rate-rounded"></Icon>
          </template>
          <template v-else-if="starType(searchResult.rating, index + 1) === StarType.Half">
            <Icon class="text-warning" icon="material-symbols:star-rate-half-rounded"></Icon>
          </template>
          <template v-else>
            <Icon icon="material-symbols:star-rate-outline-rounded"></Icon>
          </template>
        </span>
        <span class="ml-2">{{ `(${searchResult.userRatingsTotal})` }}</span>
      </div>
      <div class="actions">
        <ElButton type="primary" plain>
          <Icon class="mr-1" icon="material-symbols:visibility-rounded"></Icon>
          <span>{{ $t('SearchResultCard.actions.detail') }}</span>
        </ElButton>

        <ElButton v-if="!isSave" type="danger" plain>
          <Icon class="mr-1" icon="material-symbols:favorite-outline"></Icon>
          <span>{{ $t('SearchResultCard.actions.add') }}</span>
        </ElButton>
        <ElButton v-else type="danger">
          <Icon class="mr-1" icon="material-symbols:favorite"></Icon>
          <span>{{ $t('SearchResultCard.actions.remove') }}</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-result-card {
    @apply p-6 flex gap-x-2;
    @apply bg-white;

    .cover-image {
      @apply flex-0 self-center w-30 h-30 rounded-2;
    }

    .failed-image {
      @apply flex items-center justify-center;
      @apply w-full h-full;
      @apply bg-gray-100 text-13 text-gray-300;
    }

    .content {
      @apply flex-1;
      @apply flex flex-col;
      @apply text-primary-black text-base;
    }

    .marker-rating {
      @apply flex items-center;
    }

    .rating-star {
      @apply text-warning;
    }

    .actions {
      @apply mt-auto;
    }
  }
</style>
