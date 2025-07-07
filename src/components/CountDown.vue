<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'

const secondsLeft = defineModel<number>('seconds', {
  default: 10
})

const { pause } = useIntervalFn(() => {
  secondsLeft.value--

  if (secondsLeft.value === 0) {
    pause()
  }
}, 1000)
</script>

<template>
  <div class="fixed z-10 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
    <Transition name="fade-zoom" mode="out-in">
      <div :key="secondsLeft" class="" v-if="secondsLeft">
        <span class="text-9xl text-white" style="-webkit-text-stroke: 3px var(--color-indigo-800)">
          {{ secondsLeft }}
        </span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-zoom-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.fade-zoom-enter-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

.fade-zoom-enter-to {
  opacity: 1;
  transform: scale(1);
}

.fade-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

.fade-zoom-leave-active {
  transition:
    opacity 0.3s ease-out,
    transform 0.3s ease-out;
}

.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(1.5);
}
</style>
