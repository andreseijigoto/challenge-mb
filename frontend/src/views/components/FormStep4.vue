<template>
  <FormContainer class="form-step-4" step="4" total="4" title="Revise sua sinformações">
    <AppFieldset
      label="Endereço de e-mail"
      v-model="email"
      :error="emailError"
      @focus="emailError = ''"
    />

    <AppFieldset label="Nome" v-model="name" :error="nameError" @focus="nameError = ''" />

    <AppFieldset
      :label="docLabel"
      v-model="doc"
      :maxlength="docLength"
      :error="docError"
      @focus="docError = ''"
    />

    <AppFieldset
      :label="dateLabel"
      v-model="date"
      type="date"
      :error="dateError"
      @focus="dateError = ''"
    />

    <AppFieldset
      label="Telefone"
      v-model="phone"
      maxlength="11"
      :error="phoneError"
      @focus="phoneError = ''"
    />

    <AppFieldset
      label="Senha"
      v-model="password"
      type="password"
      passwordToggle
      :error="passwordError"
      @focus="passwordError = ''"
    />

    <AppFieldset
      v-if="showPasswordConfirmation"
      label="Confirmação da Senha"
      v-model="passwordConfirmation"
      type="password"
      passwordToggle
      :error="passwordConfirmationError"
      @focus="passwordConfirmationError = ''"
    />

    <div class="flex justify-between gap-1">
      <AppButton label="voltar" outlined @click="emit('back')" />
      <AppButton label="Cadastrar" @click="validateFields" />
    </div>
  </FormContainer>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { AppButton, AppFieldset } from '@/components'
  import { userStore } from '@/stores/user'
  import {
    validateEmpty,
    validateEmail,
    validateFullName,
    validateCpf,
    validateCnpj,
    validatePhone
  } from '@/providers/utils/useValidations'
  import FormContainer from './FormContainer.vue'

  defineOptions({
    name: 'FormStep4'
  })

  const { type, setEmail, setName, setDoc, setDate, setPhone, setPassword } = userStore()
  const emit = defineEmits(['submit', 'back'])

  const email = ref(userStore().email || '')
  const emailError = ref('')

  const name = ref(userStore().name || '')
  const nameError = ref('')

  const doc = ref(userStore().doc || '')
  const docError = ref('')

  const date = ref(userStore().date || null)
  const dateError = ref('')

  const phone = ref(userStore().phone || '')
  const phoneError = ref('')

  const password = ref(userStore().password || '')
  const passwordError = ref('')

  const passwordConfirmation = ref(userStore().password || '')
  const passwordConfirmationError = ref('')

  const showPasswordConfirmation = ref(false)

  const isPerson = computed(() => type === 'person')
  const docLabel = computed(() => (isPerson.value ? 'CPF' : 'CNPJ'))
  const docLength = computed(() => (isPerson.value ? 11 : 14))
  const dateLabel = computed(() => (isPerson.value ? 'Data de Nascimento' : 'Data de Abertura'))

  watch(email, (val) => val && setEmail(val))
  watch(name, (val) => val && setName(val))
  watch(doc, (val) => val && setDoc(val))
  watch(date, (val) => val && setDate(val))
  watch(phone, (val) => val && setPhone(val))
  watch(password, (val) => {
    if (!showPasswordConfirmation.value) {
      passwordConfirmation.value = ''
      showPasswordConfirmation.value = true
    }

    if (passwordConfirmation.value === val) {
      setPassword(val)
    }
  })

  const resetErrors = () => {
    emailError.value = ''
    nameError.value = ''
    docError.value = ''
    dateError.value = ''
    phoneError.value = ''
    passwordError.value = ''
    passwordConfirmationError.value = ''
  }

  const validateFields = () => {
    resetErrors()

    if (!validateEmpty(email.value)) {
      emailError.value = 'Campo obrigatório.'
    } else if (!validateEmail(email.value)) {
      emailError.value = 'O e-mail informado é inválido.'
    }

    if (!validateEmpty(name.value)) {
      nameError.value = 'Campo obrigatório.'
    } else if (!validateFullName(name.value)) {
      nameError.value = 'Insira seu nome completo.'
    }

    if (!validateEmpty(doc.value)) {
      docError.value = 'Campo obrigatório.'
    } else if (isPerson.value && !validateCpf(doc.value)) {
      docError.value = 'CPF inválido.'
    } else if (!isPerson.value && !validateCnpj(doc.value)) {
      docError.value = 'CNPJ inválido.'
    }

    if (!validateEmpty(date.value)) {
      dateError.value = 'Campo obrigatório.'
    }

    if (!validateEmpty(phone.value)) {
      phoneError.value = 'Campo obrigatório.'
    } else if (!validatePhone(phone.value)) {
      phoneError.value = 'Telefone/Celular inválido. Preencha com DDD.'
    }

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

    if (
      !dateError.value &&
      !docError.value &&
      !emailError.value &&
      !nameError.value &&
      !passwordConfirmationError.value &&
      !passwordError.value &&
      !phoneError.value
    ) {
      emit('submit')
    }
  }
</script>
