<script setup lang="ts">
import Button from './controls/Button.vue'
import { ref } from 'vue'

interface Props {
  isOpen?: boolean
  title?: string
  message?: string
  onConfirm?: Function
  onCancel?: Function
  confirmText?: string
  cancelText?: string
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
  title: 'Alerta',
  message: '',
  confirmText: 'Aceptar',
  cancelText: 'Cancelar',
  onConfirm: () => {},
  onCancel: () => {}
})

const emit = defineEmits(['on:modalClose'])
const target = ref<HTMLDivElement | null>(null)

const close = () => {
  emit('on:modalClose')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="w-full h-full fixed top-0 left-0 z-30 flex flex-col justify-center items-center"
  >
    <div
      v-motion
      class="w-full h-full fixed top-0 left-0 bg-endeavour-600/50"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      :leave="{ opacity: 0 }"
    ></div>
    <div
      ref="target"
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
        <slot name="header">
          <h1 class="text-3xl text-endeavour">{{ title }}</h1>
        </slot>
      </div>
      <div class="w-full p-6">
        <slot name="content">
          <p>{{ message }}</p>
        </slot>
      </div>
      <div class="w-full p-6 flex flex-row justify-center items-center">
        <slot name="actions" :close="close">
          <Button type="button" @click="close">{{ cancelText }}</Button>
          <Button type="button" @click="onConfirm()">{{ confirmText }}</Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
