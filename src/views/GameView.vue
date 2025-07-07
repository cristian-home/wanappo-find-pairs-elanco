<script setup lang="ts">
import Badge from '@/components/controls/Badge.vue'
import Button from '@/components/controls/Button.vue'
import CountDown from '@/components/CountDown.vue'
import GameBoard from '@/components/GameBoard.vue'
import QLogo from '@/components/icons/QLogo.vue'
import ModalDialog from '@/components/ModalDialog.vue'
import PairCounter from '@/components/PairCounter.vue'
import { useGameStore } from '@/stores/game'
import { invoke, until, useCounter, useIntervalFn } from '@vueuse/core'
import { useMotion } from '@vueuse/motion'
import { computed, onMounted, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'

const gameStore = useGameStore()
const router = useRouter()

const headerRef = ref<HTMLElement | null>(null)
const gameBoardRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)

const animatedElements = [headerRef, gameBoardRef, footerRef]

const gameOverModal = ref(false)
const modalTitle = ref('')
const modalText = ref('')

const startGameCountDown = ref(gameStore.startGameCountDown.valueOf())

const { count: timeLeft, dec: decTimeLeft } = useCounter(gameStore.getTimelimit)

const attempts = computed(() => gameStore.getAttempts)

const { pause, resume } = useIntervalFn(() => {
  decTimeLeft()
}, 1000)

pause()

invoke(async () => {
  await until(startGameCountDown).toBe(0)
  gameStore.startGame()
  resume()
})

invoke(async () => {
  await until(attempts).toBe(gameStore.getAttemptsLimit)
  endGame({ title: 'Juego Terminado', text: 'Se acabaron tus intentos' })
})

invoke(async () => {
  await until(timeLeft).toBe(0)
  endGame({ title: 'Juego Terminado', text: 'Se acabo el tiempo' })
})

const endGame = async (
  options: { title: string; text: string } = { title: 'Juego Terminado', text: 'Fue un buen juego' }
) => {
  pause()
  saveGameState()

  gameOverModal.value = true
  modalTitle.value = options.title
  modalText.value = options.text

  await until(gameOverModal).toBe(false)

  router.push('/congrats')
}

const saveGameState = () => {
  gameStore.setCurrentGameStats({
    date: new Date(),
    attempts: gameStore.getAttempts,
    time: gameStore.getTimelimit - timeLeft.value,
    pairsFound: gameStore.getPairsFound
  })
}

watch(
  () => gameStore.getTilesUnmatched.length,
  (value) => {
    if (value === 0) {
      endGame({ title: 'Juego Terminado', text: 'Felicitaciones has completado el juego' })
    }
  }
)

onBeforeRouteLeave(async () => {
  if (
    attempts.value < gameStore.getAttemptsLimit &&
    timeLeft.value > 0 &&
    gameStore.getTilesUnmatched.length > 0
  ) {
    return false
  }

  await await Promise.all([
    ...animatedElements.map((ref) => {
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
              type: 'spring',
              stiffness: 350,
              damping: 20,
              onComplete: () => {
                resolve(true)
              }
            }
          }
        })
      })
    })
  ])
})

onMounted(() => {
  if (gameStore.gameStarted) resume()
  if (gameStore.gameStarted && gameStore.getTilesUnmatched.length === 0) endGame()

  animatedElements.forEach((ref, index) => {
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
})
</script>

<template>
  <div
    class="h-dvh w-full overflow-x-hidden overflow-y-hidden grid grid-cols-1 grid-rows-[auto_1fr_auto] justify-items-center place-items-center gap-2"
    ref="headerRef"
  >
    <div class="h-20 w-full flex flex-row justify-between gap-8 p-0">
      <div class="w-1/4 flex flex-row justify-start items-center">
        <QLogo class="fill-astronaut max-h-full max-w-full w-20 h-20" />
      </div>
      <div class="w-2/4 flex flex-row justify-center items-center grow">
        <PairCounter
          class="scale-125 origin-top max-h-full grow"
          :pair-count="gameStore.getPairsFound"
          :max-pairs="gameStore.getMaxPosiblePairs"
        />
      </div>
      <div class="w-1/4 flex flex-row justify-end items-center">
        <img src="@/assets/img/winny-logo_600x600.webp" class="max-h-full max-w-full" />
      </div>
    </div>
    <div
      class="w-full h-[0] min-h-full flex flex-col justify-center items-center"
      ref="gameBoardRef"
    >
      <GameBoard />
    </div>
    <div class="h-20 w-full flex flex-row justify-between gap-2 p-0" ref="footerRef">
      <div class="w-2/3 flex flex-row justify-start items-center">
        <Badge class="flex-row py-1 translate-x-12">
          <template #left-icon>
            <img src="@/assets/img/crono.svg" class="w-8 h-8 scale-[3] origin-right" />
          </template>
          <div class="flex-col">
            <div class="text-sm">{{ timeLeft }} segundos</div>
            <div class="text-sm">
              Intentos {{ gameStore.attempts }} / {{ gameStore.getAttemptsLimit }}
            </div>
          </div>
        </Badge>
      </div>
      <div class="w-1/3 flex flex-row justify-end items-center self-end">
        <img src="@/assets/img/bottom-bear.webp" class="max-h-full max-w-full w-36" />
      </div>
    </div>
  </div>
  <CountDown v-model:seconds="startGameCountDown" v-if="!gameStore.gameStarted" />
  <ModalDialog
    :is-open="gameOverModal"
    :title="modalTitle"
    :message="modalText"
    @on:modalClose="() => (gameOverModal = false)"
  >
    <template #actions="{ close }">
      <Button type="button" @click="close">Aceptar</Button>
    </template>
  </ModalDialog>
</template>

<style scoped></style>
