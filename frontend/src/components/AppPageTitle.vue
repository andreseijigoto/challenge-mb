<template>
  <h1 class="app-page-title"> {{ title }}</h1>
</template>

<script setup>
defineOptions({
  name: 'AppPageTitle'
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.app-page-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}
</style>
