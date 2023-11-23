<script setup lang="ts">
import { Ref, ref, computed } from 'vue'
import type { FormItemRule, FormInstance } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils'
import { ElDialog, ElButton, ElInput, ElForm, ElFormItem } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { createTrip } from '@/apis/trip'

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'submit'): void;
  (e: 'cancel'): void;
}>()

const formEl: Ref<FormInstance | null> = ref(null)
const { t } = useI18n()

const form = ref({
  tripName: '',
})

const rules = computed(() => {
  const validateNonEmptyString: FormItemRule['asyncValidator'] = (_, v, cb) => {
    if (String(v).length === 0) {
      return cb(t('CreateTripDialog.form.trip_name_required'))
    }
    cb()
  }

  return {
    tripName: [
      { validator: validateNonEmptyString, trigger: 'change' },
    ],
  } as Record<string, Arrayable<FormItemRule>>
})

const isSubmitting = ref(false)
const submit = async () => {
  try {
    isSubmitting.value = true
    await new Promise((resolve, reject) => {
      if (!formEl.value) {
        reject(new Error('formEl should not be null'))
        return
      }

      formEl.value.validate((valid, fields) => {
        if (valid) {
          resolve(true)
        } else {
          reject(fields)
        }
      })
    })

    await createTrip(form.value.tripName)
    emit('submit')
  } catch (err) {
    console.error(err)
    isSubmitting.value = false
  }
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <ElDialog
    class="create-trip-dialog"
    :model-value="true"
    width="320px"
    align-center
    center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <template #header>
      <div class="trip-name">{{ $t('CreateTripDialog.header_trip_name') }}</div>
    </template>

    <ElForm
      ref="formEl"
      class="form"
      label-width="120px"
      :model="form"
      :rules="rules"
    >
      <ElFormItem :label="$t('CreateTripDialog.form.trip_name_label')" prop="tripName">
        <ElInput v-model="form.tripName" maxlength="10" show-word-limit />
      </ElFormItem>
    </ElForm>

    <template #footer>
      <div class="flex justify-end">
        <ElButton @click="cancel" :loading="isSubmitting">{{ $t("CreateTripDialog.actions.cancel") }}</ElButton>
        <ElButton type="primary" @click="submit" :loading="isSubmitting">{{ $t("CreateTripDialog.actions.save") }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<style lang="scss">
.create-trip-dialog {
  .el-dialog__header {
    @apply mr-0;
    @apply border-b border-gray-300;
  }

  .el-dialog__footer {
    @apply p-3;
    @apply border-t border-gray-300;
  }
}
</style>

<style lang="scss" scoped>
.trip-name {
  @apply text-primary-black text-xl;
}

.form {
  @apply text-primary-black;

  :deep(.el-form-item) {
    @apply flex-col;

    .el-form-item__label {
      @apply justify-start;
    }
  }
}
</style>
