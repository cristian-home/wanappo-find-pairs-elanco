import image1 from '@/assets/img/tiles/1.webp'
import image2 from '@/assets/img/tiles/2.webp'
import image3 from '@/assets/img/tiles/3.webp'
import image4 from '@/assets/img/tiles/4.webp'
import image5 from '@/assets/img/tiles/5.webp'
import image6 from '@/assets/img/tiles/6.webp'

export interface RawTile {
  matchValue: number
  image: string
  isRevealed: boolean
  isMatched: boolean
}

export interface Tile extends RawTile {
  id: string
}

export const tilesData: RawTile[] = [
  {
    matchValue: 1,
    image: image1,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 1,
    image: image1,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 2,
    image: image2,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 2,
    image: image2,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 3,
    image: image3,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 3,
    image: image3,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 4,
    image: image4,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 4,
    image: image4,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 5,
    image: image5,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 5,
    image: image5,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 6,
    image: image6,
    isRevealed: false,
    isMatched: false
  },
  {
    matchValue: 6,
    image: image6,
    isRevealed: false,
    isMatched: false
  }
]
