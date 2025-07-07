<script lang="ts" setup>
import Button from '@/components/controls/Button.vue'

interface Props {
  title: string
  message: string
  confirmText: string
  cancelText: string
}

withDefaults(defineProps<Props>(), {
  title: 'Esta seguro?',
  message: 'Desea realizar esta accion?',
  confirmText: 'Aceptar',
  cancelText: 'Cancelar'
})
</script>

<template>
  <div class="w-full h-full fixed top-0 left-0 z-30 flex flex-col justify-center items-center">
    <div
      v-motion
      class="w-full h-full fixed top-0 left-0 bg-endeavour-600/50"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :leave="{ opacity: 0 }"
    ></div>
    <div
      v-motion
      class="flex flex-col bg-seagull-200 rounded-2xl z-40 shadow-2xl max-w-lg w-full"
      :initial="{ opacity: 0, scale: 0 }"
      :enter="{
        opacity: 1,
        scale: 1,
        transition: { delay: 500, duration: 500, type: 'spring' }
      }"
      :leave="{ opacity: 0 }"
    >
      <div class="w-full p-6">
        <h1 class="text-3xl text-endeavour">{{ title }}</h1>
      </div>
      <div class="w-full p-6">
        <p>{{ message }}</p>
      </div>
      <div class="w-full p-6 flex flex-row justify-center items-center">
        <Button type="button">{{ cancelText }}</Button>
        <Button type="button">{{ confirmText }}</Button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
