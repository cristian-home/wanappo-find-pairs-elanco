<script setup lang="ts"></script>

<template>
  <button
    class="font-sans font-bold italic transition h-12 text-xl duration-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-md outline-solid outline-4 outline-white bg-keppel text-white px-6 py-2 -skew-x-12 flex flex-row gap-2 justify-center items-center"
  >
    <span class="skew-x-12">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
