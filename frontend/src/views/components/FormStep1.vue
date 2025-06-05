<template>
  <FormContainer class="form-step-1" step="1" total="4" title="Seja bem vindo(a)">
    <div class="form-step-1__content">
      <AppFieldset
        class="form-step-1__fieldset form-step-1__fieldset--email"
        label="Endereço de e-mail"
        v-model="email"
        :error="emailError"
        @focus="emailError = ''"
      />

      <div class="form-step-1__radiogroup" :class="{ 'form-step-1__radiogroup--error': typeError }">
        <p class="form-step-1__radiogroup-label">Tipo de Acesso</p>
        <div class="flex justify-between">
          <AppRadio
            class="form-step-1__radiogroup-radio"
            label="Pessoa Física"
            value="person"
            name="type"
            v-model="type"
            @input="typeError = ''"
          />

          <AppRadio
            class="form-step-1__radiogroup-radio"
            label="Pessoa Jurídica"
            value="company"
            name="type"
            v-model="type"
            @input="typeError = ''"
          />
        </div>

        <AppFormError :error="typeError" />
      </div>
    </div>

    <AppButton label="continuar" @click="validateFields" />
  </FormContainer>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { AppButton, AppFieldset, AppFormError, AppRadio } from '@/components'
  import { userStore } from '@/stores/user'
  import { validateEmpty, validateEmail } from '@/providers/utils/useValidations'
  import FormContainer from './FormContainer.vue'

  defineOptions({
    name: 'FormStep1'
  })

  const emit = defineEmits(['submit'])

  const { setEmail, setType, setDoc, setDate } = userStore()

  const email = ref(userStore().email || '')
  const emailError = ref('')

  const type = ref(userStore().type || '')
  const typeError = ref('')

  watch(email, (val) => val && setEmail(val))
  watch(type, (val) => {
    if (val) {
      setType(val)
      setDoc('')
      setDate('')
    }
  })

  const resetErrors = () => {
    emailError.value = ''
    typeError.value = ''
  }

  const validateFields = () => {
    resetErrors()

    if (!validateEmpty(email.value)) {
      emailError.value = 'Campo obrigatório.'
    } else if (!validateEmail(email.value)) {
      emailError.value = 'O e-mail informado é inválido.'
    }

    if (!validateEmpty(type.value)) {
      typeError.value = 'Campo obrigatório.'
    }

    if (!emailError.value && !typeError.value) {
      emit('submit')
    }
  }
</script>

<style lang="scss" scoped>
  .form-step-1 {
    &__content {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 960px) {
        flex-direction: row;
        gap: 2rem;
      }
    }

    &__fieldset {
      flex: 1;
    }

    &__radiogroup {
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      margin: 0;
      padding: 0;
      transition: all 0.25s ease-in-out;
      width: 100%;

      @media (min-width: 960px) {
        width: 270px;
      }

      &-label {
        display: none;

        @media (min-width: 680px) {
          display: block;
          font-size: var(--label-font-size);
          margin: 0;
          margin-bottom: var(--label-margin-bottom);
        }
      }

      &-radio {
        display: flex;
        height: 2rem;

        @media (min-width: 960px) {
          height: 2.5rem;
        }
      }

      &--error {
        border-color: var(--error-color);
        margin: -0.5rem;
        padding: 0.5rem;
      }
    }
  }
</style>
