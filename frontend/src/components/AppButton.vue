<template>
  <button class="app-button" :class="buttonClass" @click="emit('click')">
    {{ label }}
  </button>
</template>

<script setup>
  import { computed } from 'vue'

  defineOptions({
    name: 'AppButton'
  })

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    outlined: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['click'])

  const buttonClass = computed(() => {
    return props.outlined ? 'app-button--outlined' : ''
  })
</script>

<style lang="scss" scoped>
  .app-button {
    background-color: var(--color-primary);
    color: white;
    padding: 0 1rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-size: 1rem;
    height: 2.5rem;
    width: 100%;
    text-transform: capitalize;

    &--outlined {
      background-color: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
    }

    // &:hover {
    //   background-color: darken(var(--color-primary), 10%);
    // }

    // &:active {
    //   background-color: darken(var(--color-primary), 20%);
    // }
  }
</style>
