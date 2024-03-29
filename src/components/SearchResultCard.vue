<script setup lang="ts">
import { computed } from 'vue'
import { ElImage, ElButton } from 'element-plus'
import { Icon } from '@iconify/vue'
import { SearchResult } from '@/models/SearchResult'

const props = defineProps<{
  searchResult: SearchResult
  isSave: boolean
  isActive?: boolean
}>()

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'bindLocation', searchResult: SearchResult): void;
  (e: 'unbindLocation', searchResult: SearchResult): void;
}>()

const STAR_TYPE = {
  FULL: 'FULL',
  HALF: 'HALF',
  EMPTY: 'EMPTY',
} as const

const displayStarIcon = computed(() => {
  return Array.from({ length: 5 }).map((_, index) => {
    const difference = props.searchResult.rating - index - 1
    if (difference >= 0) {
      return STAR_TYPE.FULL
    }

    if (difference >= -0.5) {
      return STAR_TYPE.HALF
    }

    return STAR_TYPE.EMPTY
  })
})

const googleMapUrl = computed(() => {
  const googleMapDomain = 'https://www.google.com'
  const placePath = '/maps/place'
  const googleMapUrl = new URL(placePath, googleMapDomain)
  googleMapUrl.searchParams.append('q', `place_id:${props.searchResult.placeId}`)
  return googleMapUrl.href
})

const bindLocation = async () => {
  emit('bindLocation', props.searchResult)
}

const unbindLocation = async () => {
  emit('unbindLocation', props.searchResult)
}
</script>

<template>
  <div class="search-result-card" :class="{'active': isActive}">
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
        <span
          v-for="(startType, index) in displayStarIcon"
          :key="index"
          class="rating-star"
        >
          <template v-if="startType === STAR_TYPE.FULL">
            <Icon class="text-warning" icon="material-symbols:star-rate-rounded"></Icon>
          </template>
          <template v-else-if="startType === STAR_TYPE.HALF">
            <Icon class="text-warning" icon="material-symbols:star-rate-half-rounded"></Icon>
          </template>
          <template v-else>
            <Icon icon="material-symbols:star-rate-outline-rounded"></Icon>
          </template>
        </span>
        <span class="ml-2">{{ `(${searchResult.userRatingsTotal})` }}</span>
      </div>
      <div class="actions">
        <a :href="googleMapUrl" target="_blank">
          <ElButton type="primary" plain>
            <Icon class="mr-1" icon="material-symbols:visibility-rounded"></Icon>
            <span>{{ $t('SearchResultCard.actions.detail') }}</span>
          </ElButton>
        </a>

        <ElButton v-if="!isSave" type="danger" plain @click="bindLocation">
          <Icon class="mr-1" icon="material-symbols:favorite-outline"></Icon>
          <span>{{ $t('SearchResultCard.actions.add') }}</span>
        </ElButton>
        <ElButton v-else type="danger" @click="unbindLocation">
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

    &.active {
      @apply bg-gray-100;
    }

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
      @apply mt-auto space-x-2;
    }
  }
</style>
