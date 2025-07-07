<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GameTile from './GameTile.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const boardElement = ref<HTMLElement | null>(null)

onMounted(() => {})
</script>

<template>
  <div
    class="w-full h-full max-w-[40rem] max-h-[30rem] xs:max-h-[35rem] sm:max-h-[38rem] md:max-h-[40rem] p-1 xs:p-4 sm:p-4 md:p-12"
  >
    <div
      class="w-full h-full grid grid-cols-3 md:grid-cols-4 grid-rows-4 md:grid-rows-3 justify-items-center place-items-center gap-1 xs:gap-2 sm:gap-4 md:gap-12"
      ref="boardElement"
    >
      <GameTile
        v-motion
        v-for="(tile, index) in gameStore.tiles"
        :key="tile.id"
        :tile="tile"
        @click="gameStore.revealTile(tile.id)"
        :initial="{ y: 100, opacity: 0 }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 350, damping: 20, delay: index * 100 }
        }"
      />
    </div>
  </div>
</template>

<style scoped></style>
