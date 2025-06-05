<template>
  <fieldset class="app-fieldset" :class="{ 'app-fieldset--error': !!error }">
    <label v-if="label" :for="id" class="app-fieldset__label">
      {{ label }}
    </label>

    <div class="pos rel">
      <input
        :id="id"
        class="app-fieldset__input"
        :class="{ 'app-fieldset__input--password': isPasswordWithToggle }"
        :type="localType"
        v-model="newValue"
        v-bind="$attrs"
        @focus="emitFocus"
        @blur="emitBlur"
      />

      <button
        v-if="isPasswordWithToggle"
        class="app-fieldset__button-password mdi"
        :class="{
          'mdi-eye': localType === 'password',
          'mdi-eye-off': localType === 'text'
        }"
        @click.prevent="togglePasswordShow"
      />
    </div>

    <AppFormError :error="error" />
  </fieldset>
</template>

<script setup>
  import { computed, onMounted, ref, useAttrs, watch } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import AppFormError from './AppFormError.vue'

  defineOptions({
    name: 'AppFieldset'
  })

  const attrs = useAttrs()

  const props = defineProps({
    id: {
      type: String,
      default: () => uuidv4()
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (type) => ['text', 'email', 'number', 'date', 'password'].includes(type)
    },
    passwordToggle: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number, Date, null],
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue', 'focus', 'blur'])
  const newValue = ref()
  const localType = ref('')
  const isPasswordWithToggle = computed(() => props.type === 'password' && props.passwordToggle)

  onMounted(() => {
    localType.value = props.type
  })

  watch(
    () => props.modelValue,
    (val) => (newValue.value = val),
    { immediate: true }
  )

  watch(newValue, (val) => emit('update:modelValue', val))

  const emitFocus = () => emit('focus')
  const emitBlur = () => emit('blur')

  const togglePasswordShow = () => {
    localType.value = localType.value === 'password' ? 'text' : 'password'
  }
</script>

<style lang="scss" scoped>
  .app-fieldset {
    $this: &;

    border: 0px solid transparent;
    margin-inline: 0;
    padding: 0;
    transition: color 0.25s ease-in-out;

    &__label {
      display: block;
      font-size: var(--label-font-size);
      margin-bottom: var(--label-margin-bottom);
    }

    &__input {
      align-items: center;
      border-radius: var(--border-radius);
      border: 1px solid var(--input-border-color);
      box-sizing: border-box;
      display: flex;
      height: 2.5rem;
      margin: 0;
      padding: 0 0.75rem;
      width: 100%;
      transition: border-color 0.25s ease-in-out;

      &:focus-visible {
        border-color: var(--input-border-color-focus);
        outline-width: 0px;
      }

      &--password {
        padding-right: 2.5rem;
      }
    }

    &__button-password {
      background: transparent;
      border: none;
      color: var(--input-icon-color);
      cursor: pointer;
      font-size: 1.25rem;
      height: 2rem;
      padding: 0;
      position: absolute;
      right: 0.25rem;
      top: 50%;
      transform: translateY(-50%);
      width: 2rem;

      &:hover {
        color: var(--input-icon-color-hover);
      }
    }

    &--error {
      color: var(--error-color);

      #{$this}__input {
        border-color: var(--error-color);
      }
    }
  }
</style>
