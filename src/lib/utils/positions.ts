export const generateUniformPositions = (
  n: number,
  options: {
    minGridSize?: number
    maxGridSize?: number
    minSize?: number
    maxSize?: number
    minOpacity?: number
    maxOpacity?: number
    marginRight?: number
    marginBottom?: number
  } = {}
) => {
  const defaultOptions = {
    minGridSize: 10,
    maxGridSize: 100,
    minSize: 10,
    maxSize: 100,
    minOpacity: 0.5,
    maxOpacity: 1,
    marginRight: 10,
    marginBottom: 10
  }

  const {
    minGridSize,
    maxGridSize,
    minSize,
    maxSize,
    minOpacity,
    maxOpacity,
    marginRight,
    marginBottom
  } = { ...defaultOptions, ...options }

  const positions = []
  const rows = Math.ceil(
    Math.cbrt(n) > minGridSize
      ? Math.cbrt(n) < maxGridSize
        ? Math.cbrt(n)
        : maxGridSize
      : minGridSize
  )
  const cols = rows

  const grid = Array.from(Array(rows), () => new Array(cols).fill(0)).map((x, i) =>
    x.map((y, j) => {
      return {
        cell: {
          row: i,
          col: j
        },
        topFrom: Number(((i * (100 - marginBottom)) / rows).toFixed(2)),
        topTo: Number((((i + 1) * (100 - marginBottom)) / rows).toFixed(2)),
        leftFrom: Number(((j * (100 - marginRight)) / cols).toFixed(2)),
        leftTo: Number((((j + 1) * (100 - marginRight)) / cols).toFixed(2)),
        itemsCount: 0
      } as {
        cell: { row: number; col: number }
        topFrom: number
        topTo: number
        leftFrom: number
        leftTo: number
        itemsCount: number
      }
    })
  )

  for (let i = 0; i < n; i++) {
    const minCellValue = grid
      .flat()
      .reduce((a, b) => (a.itemsCount < b.itemsCount ? a : b)).itemsCount
    const minValueCells = grid.flat().filter((x) => x.itemsCount === minCellValue)
    const cell = minValueCells[Math.floor(Math.random() * minValueCells.length)]

    const size = Math.random() * (maxSize - minSize) + minSize
    const left = Math.random() * (cell.leftTo - cell.leftFrom) + cell.leftFrom
    const top = Math.random() * (cell.topTo - cell.topFrom) + cell.topFrom

    positions.push({
      x: left.toFixed(2),
      y: top.toFixed(2),
      delay: i * 0.5,
      w: size,
      h: size,
      opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
      direction: Math.random() > 0.5 ? 'reverse' : 'normal'
    })

    cell.itemsCount++
  }

  return positions
}
