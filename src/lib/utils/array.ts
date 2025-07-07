import { type RawTile, type Tile } from '@/lib/utils/game-data'
import { v4 as uuidv4 } from 'uuid'

export const pickAndShuffleGameTiles = (tiles: RawTile[], numberOfPairs: number = 12): Tile[] => {
  const tilesForUnique = structuredClone(tiles).map((tile) => ({ ...tile, id: uuidv4() })) as Tile[]
  const tilesForPick = structuredClone(tilesForUnique)
  const uniqueTilesWithUniqueMatchValue = pickRandomUniquItems(tilesForUnique, numberOfPairs)
  const matchesValues = uniqueTilesWithUniqueMatchValue.map((tile) => tile.matchValue)

  const tilesPairs = tilesForPick.filter((tile) => {
    return matchesValues.includes(tile.matchValue)
  })

  // shuffle tiles
  return shuffleArray(tilesPairs)
}

export const pickRandomUniquItems = (
  items: Tile[],
  count: number,
  picked: Tile[] = [],
  maxIterations: number = 1000
): Tile[] => {
  // console.log('Iteration: ', maxIterations)

  if (maxIterations && maxIterations <= 0) {
    return picked
  }

  if (picked.length >= count) {
    return picked
  }

  const item = items.splice(Math.floor(Math.random() * items.length), 1)[0]

  // if item.id is not in picked items and item.matchValue is not in picked items
  if (
    !picked.find((i) => i.id === item.id) &&
    !picked.find((i) => i.matchValue === item.matchValue)
  ) {
    picked.push(item)
  }

  return pickRandomUniquItems(items, count, picked, maxIterations - 1)
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice() // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
