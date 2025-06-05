<template>
  <FormContainer class="form-step-2" step="2" total="4" :title="`Pessoa ${stepTitle}`">
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

    <div class="flex justify-between gap-1">
      <AppButton label="voltar" outlined @click="emit('back')" />
      <AppButton label="continuar" @click="validateFields" />
    </div>
  </FormContainer>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'
  import { AppButton, AppFieldset } from '@/components'
  import { userStore } from '@/stores/user'
  import {
    validateEmpty,
    validateFullName,
    validateCpf,
    validateCnpj,
    validatePhone
  } from '@/providers/utils/useValidations'
  import FormContainer from './FormContainer.vue'

  defineOptions({
    name: 'FormStep2'
  })

  const { type, setName, setDoc, setDate, setPhone } = userStore()
  const emit = defineEmits(['submit', 'back'])

  const name = ref(userStore().name || '')
  const nameError = ref('')

  const doc = ref(userStore().doc || '')
  const docError = ref('')

  const date = ref(userStore().date || null)
  const dateError = ref('')

  const phone = ref(userStore().phone || '')
  const phoneError = ref('')

  const isPerson = computed(() => type === 'person')
  const docLabel = computed(() => (isPerson.value ? 'CPF' : 'CNPJ'))
  const docLength = computed(() => (isPerson.value ? 11 : 14))
  const dateLabel = computed(() => (isPerson.value ? 'Data de Nascimento' : 'Data de Abertura'))
  const stepTitle = computed(() => (isPerson.value ? 'Física' : 'Jurídica'))

  watch(name, (val) => val && setName(val))
  watch(doc, (val) => val && setDoc(val))
  watch(date, (val) => val && setDate(val))
  watch(phone, (val) => val && setPhone(val))

  const resetErrors = () => {
    nameError.value = ''
    docError.value = ''
    dateError.value = ''
    phoneError.value = ''
  }

  const validateFields = () => {
    resetErrors()

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

    if (!nameError.value && !docError.value && !dateError.value && !phoneError.value) {
      emit('submit')
    }
  }
</script>
