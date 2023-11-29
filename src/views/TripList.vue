<script setup lang="ts">
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Trip } from '@/apis/trip'
import { ref, onBeforeMount } from 'vue'
import { ElButton } from 'element-plus'
import { Icon } from '@iconify/vue'
import TripCard from '@/components/TripCard.vue'
import CreateTripDialog from '@/components/CreateTripDialog.vue'
import { getTrips } from '@/apis/trip'

const tripList: Ref<Trip[]> = ref([])
const fetchTripList = async () => {
  const response = await getTrips()
  tripList.value = response
}
onBeforeMount(async () => {
  await fetchTripList()
})

const isCreateDialogOpen = ref(false)
const closeCreateDialog = () => {
  isCreateDialogOpen.value = false
}
const openCreateDialog = () => {
  isCreateDialogOpen.value = true
}
const handleTripCreated = async () => {
  await fetchTripList()
  closeCreateDialog()
}

const router = useRouter()
const goToDetailPage = (tripId: number) => {
  router.push({ name: 'TripDetail', params: { tripId } })
}
</script>

<template>
  <div class="trip-list">
    <ElButton class="create-button" type="success" size="large" plain @click="openCreateDialog">
      <Icon class="create-icon" icon="material-symbols:add-notes-outline-rounded"></Icon>
      <span>{{ $t("TripList.actions.create_trip") }}</span>
    </ElButton>
    <div class="card-list">
      <TripCard
        class="trip-card"
        v-for="trip in tripList"
        :key="trip.id"
        :id="trip.id"
        :trip-name="trip.tripName"
        :create-at="trip.createdAt"
        @click="goToDetailPage(trip.id)"
      ></TripCard>
    </div>
  </div>

  <CreateTripDialog
    v-if="isCreateDialogOpen"
    @cancel="closeCreateDialog"
    @submit="handleTripCreated"
  ></CreateTripDialog>
</template>

<style lang="scss" scoped>
.trip-list {
  @apply p-4 flex flex-col;

  .create-button {
    @apply ml-auto mb-4;
  }

  .create-icon {
    @apply mr-2 text-lg leading-none;
  }

  @media (width <= 1024px) {
    .card-list {
      @apply grid grid-cols-1 gap-4;
    }
  }

  @media (1024px < width <= 1536px) {
    .card-list {
      @apply grid grid-cols-2 gap-4;
    }
  }

  @media (1536px < width) {
    .card-list {
      @apply grid grid-cols-3 gap-4;
    }
  }
}
</style>
