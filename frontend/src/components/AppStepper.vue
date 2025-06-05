<template>
  <p class="app-stepper">
    Etapa
    <span class="app-stepper__step app-stepper__step--highlight">
      {{ current }}
    </span>
    de
    <span class="app-stepper__step">
      {{ total }}      
    </span>
  </p>
</template>

<script setup>
defineOptions({
  name: 'AppStepper'
})

const props = defineProps({
  current: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.app-stepper {
  font-size: .75rem;
  margin: 0;

  &__step {
    font-weight: bold;
  }

  &__step--highlight {
    color: var(--color-primary);
  }
}
</style>
