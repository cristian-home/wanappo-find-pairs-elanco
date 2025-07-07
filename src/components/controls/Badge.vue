<script setup lang="ts">
import IonHeart from '~icons/ion/heart'
</script>

<template>
  <div
    class="transition h-auto text-xl shadow-md outline-solid outline-4 outline-white bg-keppel text-white -skew-x-12 px-4 py-2 flex flex-row gap-2 justify-center items-center"
  >
    <div class="skew-x-12">
      <slot name="left-icon">
        <IonHeart class="w-4 h-4 -rotate-45 text-alizarin-crimson" />
      </slot>
    </div>
    <div class="skew-x-12">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
