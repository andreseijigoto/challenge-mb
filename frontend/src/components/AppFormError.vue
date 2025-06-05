<template>
  <span class="app-error" :class="{ 'app-error--visible': error }">
    {{ error }}
  </span>
</template>

<script setup>
  defineOptions({
    name: 'AppError'
  })

  defineProps({
    error: {
      type: String,
      default: ''
    }
  })
</script>

<style lang="scss" scoped>
  .app-error {
    color: var(--error-color);
    display: block;
    font-size: 0.75rem;
    margin-top: 0;
    max-height: 0px;
    transition: all 0.25s ease-in-out;

    &--visible {
      margin-top: 0.125rem;
      max-height: 2rem;
    }
  }
</style>
