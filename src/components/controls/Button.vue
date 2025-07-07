<script setup lang="ts">
import IonHeart from '~icons/ion/heart'
</script>

<template>
  <button
    class="transition h-12 text-xl duration-300 hover:shadow-xl hover:scale-105 hover:shadow-seagull active:scale-95 shadow-md outline-solid outline-4 outline-white bg-linear-to-t bg-astronaut text-white rounded-full px-4 py-2 flex flex-row gap-2 justify-center items-center"
  >
    <IonHeart class="w-4 h-4 -rotate-45 text-laser" />
    <slot />
    <IonHeart class="w-4 h-4 rotate-45 text-laser" />
  </button>
</template>

<style scoped></style>
