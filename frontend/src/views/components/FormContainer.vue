<template>
  <div class="form-container">
    <div class="form-container__header">
      <AppStepper :current="step" :total="total" />
      <AppPageTitle :title="title" />
    </div>

    <slot />
  </div>
</template>

<script setup>
  import { AppPageTitle, AppStepper } from '@/components'

  defineOptions({
    name: 'FormContainer'
  })

  const props = defineProps({
    step: {
      type: [Number, String],
      required: true
    },
    total: {
      type: [Number, String],
      required: true
    },
    title: {
      type: String,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
