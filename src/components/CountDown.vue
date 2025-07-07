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
      <div :key="secondsLeft" class="text-seagull-50" v-if="secondsLeft">
        <span class="text-9xl" style="text-shadow: 0px 5px 10px #000000c7">
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
