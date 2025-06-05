<template>
  <div class="form-view">
    <div class="container">
      <FormStep1
        v-if="curr === 1"
        ref="step-1"
        class="form-view__step"
        :class="{ 'form-view__step--active': curr === 1 }"
        :total-steps="totalSteps"
        @submit="setNextStep"
      />

      <FormStep2
        v-if="curr === 2"
        ref="step-2"
        class="form-view__step"
        :class="{ 'form-view__step--active': curr === 2 }"
        :total-steps="totalSteps"
        @back="setPrevStep"
        @submit="setNextStep"
      />

      <FormStep3
        v-if="curr === 3"
        ref="step-3"
        class="form-view__step"
        :class="{ 'form-view__step--active': curr === 3 }"
        :total-steps="totalSteps"
        @back="setPrevStep"
        @submit="setNextStep"
      />

      <FormStep4
        v-if="curr === 4"
        ref="step-4"
        class="form-view__step"
        :class="{ 'form-view__step--active': curr === 4 }"
        :total-steps="totalSteps"
        @back="setPrevStep"
        @submit="handleRegister"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { userStore } from '@/stores/user'
  import { PostRegistration } from '@/providers/services/registrationService'
  import FormStep1 from './components/FormStep1.vue'
  import FormStep2 from './components/FormStep2.vue'
  import FormStep3 from './components/FormStep3.vue'
  import FormStep4 from './components/FormStep4.vue'

  defineOptions({
    name: 'FormView'
  })

  const curr = ref(1)
  const totalSteps = 4

  const setNextStep = () => {
    if (curr.value < totalSteps) {
      curr.value = curr.value + 1
    }
  }

  const setPrevStep = () => {
    if (curr.value > 1) {
      curr.value = curr.value - 1
    }
  }

  const handleRegister = async () => {
    const { email, name, doc, date, phone, password, type } = userStore()
    const payload = { email, name, doc, date, phone, password, type }

    const { success, error } = await PostRegistration(JSON.stringify(payload))

    if (success) {
      alert('Registro realizado com sucesso!')
      await userStore().$reset()
      curr.value = 1
    } else {
      alert(error)
    }
  }
</script>

<style lang="scss" scoped>
  .form-view {
    padding: 1rem 0;

    &__step {
      margin: 0 auto;
      max-width: 400px;
      opacity: 0;

      @media screen and (min-width: 960px) {
        max-width: 800px;
      }

      &--active {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }
    }
  }
</style>
