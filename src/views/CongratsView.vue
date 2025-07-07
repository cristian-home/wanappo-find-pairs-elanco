<script setup lang="ts">
import Button from '@/components/controls/Button.vue'
import ElancoLogo from '@/assets/img/logos/ElancoLogo.svg?skipsvgo'
import BelamylLogo from '@/assets/img/logos/BelamylLogo.svg?skipsvgo'
import Bg1 from '@/assets/img/bg/image1.webp'
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
    :style="{
      backgroundImage: `url(${Bg1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 75%',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- <QLogo class="absolute top-2 left-2 w-16 h-16 fill-keppel" ref="qLogoRef" /> -->
    <ElancoLogo class="absolute top-2 right-0 h-16" />
    <div class="mt-14" ref="logoRef">
      <BelamylLogo class="max-w-2xl w-full" />
    </div>
    <div class="flex flex-col gap-4 justify-center items-center" ref="congratsRef">
      <!-- <img src="@/assets/img/congrats.webp" class="max-h-72 mx-3" alt="" /> -->
      <div class="-mt-1" style="text-shadow: #fff 0px 0px 4px;">
        <p class="text-center text-indigo text-2xl font-bold">Lograste armar</p>
        <p class="text-center text-alizarin-crimson text-5xl font-bold">
          {{ gameStore.getPairsFound }} parejas
        </p>
      </div>

      <Button type="button" @click="newGame">Aceptar</Button>
    </div>
    <div class="text-white text-center text-xl">
      <p>
        Recomendado por el
        <span class="font-bold">gurú de la ganadería y con el respaldo de Elanco.</span>
      </p>

      <p class="text-[0.4rem]">
        Belamyl R, Elanco y la barra diagonal del logo son marcas registradas de Elanco o sus
        afiliadas. © 2022 Elanco. PM-CO-22-0016
      </p>
    </div>
  </div>
</template>

<style scoped></style>
