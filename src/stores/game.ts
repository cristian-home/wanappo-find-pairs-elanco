import { pickAndShuffleGameTiles } from '@/lib/utils/array'
import { tilesData, type Tile } from '@/lib/utils/game-data'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface GameStats {
  date: Date
  attempts: number
  time: number
  pairsFound: number
}

export const useGameStore = defineStore(
  'game',
  () => {
    const startGameCountDown = ref(10)
    const gameStarted = ref(false)
    const timeLimit = ref(60)
    const attemptsLimit = ref(6)

    const currentGameStats = ref<GameStats>({
      date: new Date(),
      attempts: 0,
      time: 0,
      pairsFound: 0
    })

    const gameStats = ref<GameStats[]>([])

    const tiles = ref<Tile[]>(pickAndShuffleGameTiles(tilesData, 6))

    const attempts = ref(0)

    const getTimelimit = computed(() => {
      return timeLimit.value
    })

    const getAttemptsLimit = computed(() => {
      return attemptsLimit.value
    })

    const getAttempts = computed(() => {
      return attempts.value
    })

    const getTilesRevealed = computed(() => {
      return tiles.value.filter((tile) => tile.isRevealed && !tile.isMatched)
    })

    const getTilesUnmatched = computed(() => {
      return tiles.value.filter((tile) => !tile.isMatched)
    })

    const getTilesMatched = computed(() => {
      return tiles.value.filter((tile) => tile.isMatched)
    })

    const getTilesRevealedCount = computed(() => {
      return getTilesRevealed.value.length
    })

    const getMaxPosiblePairs = computed(() => {
      return Math.floor(tiles.value.length / 2)
    })

    const getPairsFound = computed(() => {
      return getTilesMatched.value.length / 2
    })

    const setCurrentGameStats = (stats: GameStats) => {
      currentGameStats.value = stats
    }

    const startGame = () => {
      gameStarted.value = true
    }

    const newGame = () => {
      gameStats.value.push(currentGameStats.value)
      gameStarted.value = false
      // startGameCountDown.value = 10

      currentGameStats.value = {
        date: new Date(),
        attempts: 0,
        time: 0,
        pairsFound: 0
      }

      tiles.value = pickAndShuffleGameTiles(tilesData, 6)

      attempts.value = 0
    }

    const setTileRevealed = (tileId: string) => {
      const tile = tiles.value.find((t) => t.id === tileId)

      if (!tile) return

      tile.isRevealed = true
    }

    const flipRevealedUnmatchedTiles = () => {
      getTilesRevealed.value.forEach((tile) => {
        if (!tile.isMatched) {
          tile.isRevealed = false
        }
      })
    }

    const revealTile = (tileId: string) => {
      const tile = tiles.value.find((t) => t.id === tileId)

      if (!tile) return

      if (tile.isRevealed) return

      if (tile.isMatched) return

      if (getTilesRevealed.value.length > 1) {
        flipRevealedUnmatchedTiles()
      }

      setTileRevealed(tileId)

      if (getTilesRevealed.value.length === 2) {
        attempts.value = (attempts.value || 0) + 1
        if (getTilesRevealed.value[0].matchValue === getTilesRevealed.value[1].matchValue) {
          getTilesRevealed.value.forEach((t) => {
            t.isMatched = true
          })
        }
      }
    }

    return {
      startGameCountDown,
      gameStarted,
      timeLimit,
      attemptsLimit,
      currentGameStats,
      gameStats,
      tiles,
      attempts,
      getTimelimit,
      getAttemptsLimit,
      getAttempts,
      getTilesRevealed,
      getTilesRevealedCount,
      getTilesUnmatched,
      getTilesMatched,
      getMaxPosiblePairs,
      getPairsFound,
      startGame,
      setCurrentGameStats,
      newGame,
      setTileRevealed,
      flipRevealedUnmatchedTiles,
      revealTile
    }
  },
  {
    persist: {
      key: 'game2'
    }
  }
)
