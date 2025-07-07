<script setup lang="ts">
import QLogo from '@/components/icons/QLogo.vue'
import type { Tile } from '@/lib/utils/game-data'
import { useMotion } from '@vueuse/motion'
import { computed, ref, watch } from 'vue'
import { useGameStore } from '@/stores/game'

const props = defineProps<{
  tile: Tile
}>()

const gameStore = useGameStore()

const tileRef = ref<HTMLDivElement | null>(null)
const image = ref<HTMLImageElement | null>(null)
const qLogoRef = ref<SVGElement | null>(null)

const tileRevealed = computed(() => {
  return props.tile.isRevealed || !gameStore.gameStarted
})

watch(
  () => props.tile.isMatched,
  (value: boolean) => {
    if (value) {
      // animate bounce from scale 1 to 1.5 to 1
      const { variant } = useMotion(tileRef, {
        initial: {
          scale: 1
        },
        enter: {
          scale: 1.2,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20,
            onComplete: () => {
              variant.value = 'default'
            }
          }
        },
        default: {
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20
          }
        }
      })
    }
  }
)
</script>

<template>
  <div class="group" ref="tileRef">
    <button
      class="active:!scale-90 duration-75 !transition-transform cursor-pointer w-20 h-20 xs:w-24 xs:h-24 group-even:bg-endeavour group-odd:bg-cerulean text-cerulean-50 rounded-md overflow-hidden outline outline-[6px] outline-seagull-50 shadow-[0px_5px_10px_8px_rgba(0,_51,_101,_0.75)]"
      :class="{
        'outline-seagull-600': !props.tile.isMatched && props.tile.isRevealed,
        '!outline-red-400':
          !props.tile.isMatched && props.tile.isRevealed && gameStore.getTilesRevealedCount > 1
      }"
    >
      <Transition name="fade" mode="out-in">
        <QLogo v-if="!tileRevealed" class="m-6 fill-seagull-50" ref="qLogoRef" />
        <img v-else :src="props.tile.image" class="w-full h-full" ref="image" />
      </Transition>
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
