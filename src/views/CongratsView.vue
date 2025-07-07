<script setup lang="ts">
import Button from '@/components/controls/Button.vue'
import QLogo from '@/components/icons/QLogo.vue'
// import { canionConfetti } from '@/lib/utils/confetti'
import { useGameStore } from '@/stores/game'
import { useMotion } from '@vueuse/motion'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const pageContent = ref<HTMLDivElement | null>(null)
const qLogoRef = ref<HTMLDivElement | null>(null)
const logoRef = ref<HTMLDivElement | null>(null)
const congratsRef = ref<HTMLDivElement | null>(null)

const gameStore = useGameStore()

const router = useRouter()

const refs = [qLogoRef, logoRef, congratsRef]

const newGame = () => {
  gameStore.newGame()
  router.push({ name: 'home' })
}

onMounted(() => {
  refs.forEach((ref, index) => {
    useMotion(ref, {
      initial: {
        y: 100,
        opacity: 0
      },
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 350,
          damping: 20,
          delay: index * 150
        }
      }
    })
  })

  if (gameStore.getPairsFound > 0) {
    // canionConfetti(pageContent.value as HTMLDivElement)
  }
})
</script>

<template>
  <div
    ref="pageContent"
    class="p-4 w-full h-dvh overflow-x-hidden overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr] justify-items-center align-items-center"
  >
    <QLogo class="absolute top-2 left-2 w-16 h-16 fill-astronaut" ref="qLogoRef" />
    <div class="" ref="logoRef">
      <img src="@/assets/img/winny-logo_600x600.webp" class="max-h-24 mx-3" />
    </div>
    <div class="flex flex-col gap-4 justify-center items-center" ref="congratsRef">
      <img src="@/assets/img/congrats.webp" class="max-h-72 mx-3" alt="" />
      <div class="-mt-1">
        <p class="text-center text-endeavour">Lograste armar</p>
        <p class="text-center text-laser text-5xl">{{ gameStore.getPairsFound }} parejas</p>
      </div>

      <Button type="button" @click="newGame">Aceptar</Button>
    </div>
  </div>
</template>

<style scoped></style>
