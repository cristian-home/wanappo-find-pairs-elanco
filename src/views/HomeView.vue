<script setup lang="ts">
import Button from '@/components/controls/Button.vue'
import QLogo from '@/components/icons/QLogo.vue'
import { useGameStore } from '@/stores/game'
import { useMotion } from '@vueuse/motion'
import { onMounted, ref, type Ref } from 'vue'
import { RouterLink, onBeforeRouteLeave, useRouter } from 'vue-router'

const router = useRouter()

const qLogoRef = ref<HTMLDivElement | null>(null)
const pageContent = ref<HTMLDivElement | null>(null)
const winnyLogo = ref<HTMLImageElement | null>(null)
const start = ref<HTMLDivElement | null>(null)
const buttonStart = ref<HTMLButtonElement | null>(null)
const footerParagraphLeft = ref<HTMLParagraphElement | null>(null)
const footerParagraphRight = ref<HTMLParagraphElement | null>(null)
const buttonStartRef = ref<HTMLButtonElement | null>(null)

const floatingElements = [winnyLogo, start, buttonStart]
const fixedElements = [footerParagraphLeft, footerParagraphRight]
const absoluteElements = [qLogoRef]

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

const animateFloating = (ref: Ref<HTMLElement | null>, index: number = 0) => {
  const { variant } = useMotion(ref, {
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
        delay: index * 250,
        onComplete: () => {
          variant.value = 'levitate'
        }
      }
    },
    levitate: {
      y: 10,
      transition: {
        duration: 2000,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'mirror',
        delay: index * 500
      }
    }
  })
}

const animateLeave = async () => {
  await Promise.all([
    ...floatingElements.reverse().map((ref, index) => {
      return new Promise((resolve) => {
        useMotion(ref, {
          initial: {
            scale: 1,
            opacity: 1
          },
          enter: {
            scale: 0,
            opacity: 0,
            transition: {
              // type: 'spring',
              // stiffness: 350,
              delay: index * 150,
              onComplete: () => {
                resolve(true)
              }
            }
          }
        })
      })
    }),

    ...fixedElements.reverse().map((ref, index) => {
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
              // type: 'spring',
              // stiffness: 350,
              // damping: 20,
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

  floatingElements.forEach((ref, index) => {
    animateFloating(ref, index)
  })

  fixedElements.forEach((ref, index) => {
    animateEnter(ref, index)
  })
})
</script>

<template>
  <div class="h-dvh max-h-dvh w-full overflow-x-hidden">
    <QLogo
      class="absolute top-2 left-2 w-16 h-16 fill-astronaut"
      ref="qLogoRef"
      @click="() => router.push({ name: 'config' })"
    />
    <div
      ref="pageContent"
      class="w-full h-full overflow-x-hidden overflow-y-hidden grid grid-cols-1 grid-rows-[auto_minmax(0,_1fr)_auto] justify-items-center align-items-center gap-4 p-4"
    >
      <div class="col-start-1 col-end-1 row-start-1 row-end-1">
        <img src="@/assets/img/winny-logo_600x600.webp" class="max-h-28" ref="winnyLogo" />
      </div>
      <div
        ref="start"
        :leave="{ opacity: 0 }"
        class="col-start-1 col-end-1 row-start-2 row-end-2 flex flex-col justify-center items-center"
      >
        <div class="h-2/4 flex flex-row justify-center">
          <img src="@/assets/img/bear-circle.webp" class="h-full w-auto object-contain" />
        </div>
        <div class="h-1/4 flex flex-row justify-center">
          <img src="@/assets/img/start-text.webp" class="h-full w-auto object-contain" />
        </div>
        <div class="h-1/4" ref="buttonStart">
          <RouterLink to="/game" custom v-slot="{ navigate }">
            <Button type="button" @click="navigate" ref="buttonStartRef">Iniciar</Button>
          </RouterLink>
        </div>
      </div>
      <div
        class="w-full col-start-1 col-end-1 row-start-3 row-end-3 flex flex-row justify-center gap-10"
      >
        <div class="max-w-64 w-1/2 relative">
          <img
            src="@/assets/img/timer-start.svg"
            class="w-10 absolute -top-6 -left-0 object-contain"
          />
          <p class="text-lg text-center text-endeavour" ref="footerParagraphLeft">
            <span>En </span>
            <span class="text-2xl text-laser">
              {{ useGameStore().startGameCountDown }} segundos
            </span>
            <br />
            <span>deberas memorizar las fichas</span>
          </p>
        </div>
        <div class="max-w-64 w-1/2 relative">
          <img
            src="@/assets/img/bounce-stars.svg"
            class="w-44 absolute -top-24 -left-1 object-contain"
          />
          <p class="text-lg text-center text-endeavour" ref="footerParagraphRight">
            Son
            <span class="text-2xl text-laser">{{ useGameStore().attemptsLimit }} movimientos</span>
            para armar la mayor cantidad de parejas
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
