<template>
  <fieldset class="app-radio">
    <input
      :id="id"
      type="radio"
      :name="name"
      :value="value"
      class="app-radio__input"
      v-model="newValue"
    />

    <label v-if="label" :for="id" class="app-radio__label">
      {{ label }}
    </label>
  </fieldset>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { v4 as uuidv4 } from 'uuid'

  defineOptions({
    name: 'AppRadio'
  })

  const props = defineProps({
    id: {
      type: String,
      default: () => uuidv4()
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const newValue = ref()

  watch(
    () => props.modelValue,
    (val) => (newValue.value = val),
    { immediate: true }
  )

  watch(newValue, (val) => emit('update:modelValue', val))
</script>

<style lang="scss" scoped>
  .app-radio {
    $this: &;

    border: 0px solid transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;

    &__label {
      align-items: center;
      display: flex;
      font-size: 0.875rem;
      gap: 0.375rem;
      position: relative;

      &:after,
      &:before {
        border-radius: 100%;
        content: '';
        display: block;
        transition: all 0.25s ease-in-out;
      }

      &:before {
        border: 1px solid var(--input-border-color);
        min-height: 1.25rem;
        min-width: 1.25rem;
      }

      &:after {
        margin-left: 5px;
        min-height: 0.75rem;
        min-width: 0.75rem;
        position: absolute;
      }
    }

    &__input {
      margin-left: 0;
      position: absolute;
      visibility: hidden;

      &:checked {
        & + #{$this}__label {
          &:before {
            border-color: var(--color-primary);
            box-shadow: 0 0 0 1px inset var(--color-primary);
          }
          &:after {
            background-color: var(--color-primary);
          }
        }
      }
    }
  }
</style>
