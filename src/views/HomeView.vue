<script setup lang="ts">
import Button from '@/components/controls/Button.vue'
import ElancoLogo from '@/assets/img/logos/ElancoLogo.svg?skipsvgo'
import CADLogo from '@/assets/img/logos/CADLogo.svg?skipsvgo'
import { useGameStore } from '@/stores/game'
import { useMotion } from '@vueuse/motion'
import { onMounted, ref, type Ref } from 'vue'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import Bg3 from '@/assets/img/bg/image3.webp'

const elancoLogoRef = ref<HTMLElement | null>(null)
const pageContent = ref<HTMLDivElement | null>(null)

const footerParagraphLeft = ref<HTMLParagraphElement | null>(null)
const footerParagraphRight = ref<HTMLParagraphElement | null>(null)
const buttonStartRef = ref<HTMLButtonElement | null>(null)

const fixedElements = [footerParagraphLeft, footerParagraphRight]
const absoluteElements = [elancoLogoRef]

const animateEnter = (ref: Ref<HTMLElement | null>, index: number = 0) => {
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
        delay: index * 50
      }
    }
  })
}

const animateLeave = async () => {
  await Promise.all([
    fixedElements.reverse().map((ref, index) => {
      return new Promise((resolve) => {
        useMotion(ref, {
          initial: {
            y: 0,
            opacity: 1
          },
          enter: {
            y: 100,
            opacity: 0,
            transition: {
              delay: index * 150,
              onComplete: () => {
                resolve(true)
              }
            }
          }
        })
      })
    })
  ])
}

onBeforeRouteLeave(async () => {
  await animateLeave()
})

onMounted(() => {
  absoluteElements.forEach((ref, index) => {
    useMotion(ref, {
      initial: {
        opacity: 0,
        scale: 0
      },
      enter: {
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 350,
          damping: 20,
          delay: index * 100
        }
      }
    })
  })

  fixedElements.forEach((ref, index) => {
    animateEnter(ref, index)
  })
})
</script>

<template>
  <div
    class="h-dvh max-h-dvh w-full overflow-x-hidden"
    :style="{
      backgroundImage: `url(${Bg3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 75%'
    }"
  >
    <ElancoLogo class="absolute top-4 right-4 w-32 h-16" ref="elancoLogoRef" />
    <div
      ref="pageContent"
      class="w-full h-full overflow-x-hidden overflow-y-hidden grid grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] justify-items-center align-items-center gap-4 p-4"
      style="
        background: #ffffff;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 70%,
          rgba(255, 255, 255, 1) 100%
        );
      "
    >
      <div class="col-start-1 col-end-1 row-start-1 row-end-1 mt-16">
        <CADLogo class="h-64 w-auto drop-shadow-xs drop-shadow-white" />
      </div>
      <div
        :leave="{ opacity: 0 }"
        class="col-start-1 col-end-1 row-start-2 row-end-2 flex flex-col justify-center items-center"
      >
        <div class="">
          <RouterLink to="/game" custom v-slot="{ navigate }">
            <Button type="button" @click="navigate" ref="buttonStartRef">Iniciar</Button>
          </RouterLink>
        </div>
      </div>
      <div
        class="w-full col-start-1 col-end-1 row-start-3 row-end-3 flex flex-row justify-center gap-10"
      >
        <div class="max-w-64 w-1/2 relative">
          <p class="font-bold text-lg text-center text-indigo" ref="footerParagraphLeft">
            <span>En </span>
            <span class="text-2xl text-alizarin-crimson">
              {{ useGameStore().startGameCountDown }} segundos
            </span>
            <br />
            <span>deberas memorizar las fichas</span>
          </p>
        </div>
        <div class="max-w-64 w-1/2 relative">
          <p class="font-bold text-lg text-center text-indigo" ref="footerParagraphRight">
            Son
            <span class="text-2xl text-alizarin-crimson"
              >{{ useGameStore().attemptsLimit }} movimientos</span
            >
            para armar la mayor cantidad de parejas
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
