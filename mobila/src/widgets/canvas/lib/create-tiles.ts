export async function createTiles(
  container: HTMLElement,
  tilesContainer: HTMLElement,
  data: any[],
  minScaleFactor: number,
  maxScaleFactor: number
) {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      if (!container) reject(new Error('no container'));
      if (!tilesContainer) reject(new Error('no tilesContainer'));
      let n: number = recalculateTilesCount(tilesContainer);
      resolve(n);
    }, 2);
  });
}

function recalculateTilesCount(canvas: HTMLElement): number {
  const createGrid = (wrapper: HTMLElement | null): number => {
    if (!wrapper) return 0;

    const size = document.body.clientWidth > 800 ? 50 : 70;

    let columns = Math.floor(wrapper.clientWidth / size);
    let rows = Math.floor(wrapper.clientHeight / size);

    wrapper.style.setProperty('--columns', columns.toString());
    wrapper.style.setProperty('--rows', rows.toString());

    return columns * rows;
  };

  return createGrid(canvas);
}
