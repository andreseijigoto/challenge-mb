<template>
  <FormContainer class="form-step-3" step="3" total="4" title="Senha de acesso">
    <AppFieldset
      label="Senha"
      v-model="password"
      type="password"
      passwordToggle
      :error="passwordError"
      @focus="passwordError = ''"
    />

    <AppFieldset
      label="Confirmação da Senha"
      v-model="passwordConfirmation"
      type="password"
      passwordToggle
      :error="passwordConfirmationError"
      @focus="passwordConfirmationError = ''"
    />

    <div class="flex justify-between gap-1">
      <AppButton label="voltar" outlined @click="emit('back')" />
      <AppButton label="continuar" @click="validateFields" />
    </div>
  </FormContainer>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { AppButton, AppFieldset } from '@/components'
  import { userStore } from '@/stores/user'
  import { validateEmpty } from '@/providers/utils/useValidations'
  import FormContainer from './FormContainer.vue'

  defineOptions({
    name: 'FormStep3'
  })

  const { setPassword } = userStore()
  const emit = defineEmits(['submit', 'back'])

  const password = ref(userStore().password || '')
  const passwordError = ref('')

  const passwordConfirmation = ref('')
  const passwordConfirmationError = ref('')

  watch(password, (val) => passwordConfirmation.value === val && setPassword(val))
  watch(passwordConfirmation, (val) => password.value === val && setPassword(val))

  const resetErrors = () => {
    passwordError.value = ''
  }

  const validateFields = () => {
    resetErrors()

    if (!validateEmpty(password.value)) {
      passwordError.value = 'Campo obrigatório.'
    } else if (password.value.length < 8) {
      passwordError.value = 'Comprimento mínimo de 8 caracteres.'
    } 
    
    if (!validateEmpty(passwordConfirmation.value)) {
      passwordConfirmationError.value = 'Campo obrigatório.'
    } else if (password.value !== passwordConfirmation.value) {
      passwordConfirmationError.value = 'Senha e confirmação de senha não coincidem.'
    }

    if (!passwordError.value && !passwordConfirmationError.value) {
      emit('submit')
    }
  }
</script>
