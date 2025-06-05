import { ref } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore('user', () => {
  const email = ref('')
  const type = ref('')
  const name = ref('')
  const doc = ref('')
  const date = ref('')
  const phone = ref('')
  const password = ref('')

  const $reset = () => {
    email.value = ''
    type.value = ''
    name.value = ''
    doc.value = ''
    date.value = ''
    phone.value = ''
    password.value = ''
  }

  const setEmail = (value) => (email.value = value)
  const setType = (value) => (type.value = value)
  const setName = (value) => (name.value = value)
  const setDoc = (value) => (doc.value = value)
  const setDate = (value) => (date.value = value)
  const setPhone = (value) => (phone.value = value)
  const setPassword = (value) => (password.value = value)

  return {
    email,
    type,
    name,
    doc,
    date,
    phone,
    password,
    $reset,
    setEmail,
    setType,
    setName,
    setDoc,
    setDate,
    setPhone,
    setPassword
  }
})
