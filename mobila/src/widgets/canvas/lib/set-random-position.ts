import { Rect } from './models';

export function getRandomRects(container: HTMLElement, items: NodeListOf<HTMLElement>) {
  return new Promise<Rect[]>((resolve) => {
    let rects: Rect[] = [];
    items.forEach((item) => {
      let newRect = getRandomRect(item, container, rects);
      if (newRect) rects.push(newRect);
    });
    resolve(rects);
  });
}

function getRandomRect(item: HTMLElement, container: HTMLElement, rects: Rect[]): Rect | null {
  const { width, height, maxLeft, minLeft, maxTop, minTop } = getItemParams(item, container);
  let left,
    top,
    tries = 0;
  do {
    tries++;

    left = getRandomNumber(minLeft, maxLeft);
    top = getRandomNumber(minTop, maxTop);
    const newRect = { left, top, width, height };
    if (checkOverlap(newRect, rects)) {
      console.log('overlapped');
      continue; // Overlapping, try again
    }
    return newRect;
  } while (tries < 20);

  return null;
}

function getItemParams(item: HTMLElement, container: HTMLElement) {
  const width = item.offsetWidth;
  const height = item.offsetHeight;
  const maxLeft = container.offsetWidth - width;
  const minLeft = 0;
  const maxTop = container.offsetWidth - height;
  const minTop = 0;
  return { width, height, maxLeft, minLeft, maxTop, minTop };
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkOverlap(newRect: Rect, rectangles: Rect[]): boolean {
  for (let i = 0; i < rectangles.length; i++) {
    const rect = rectangles[i];
    if (
      newRect.left < rect.left + rect.width &&
      newRect.left + newRect.width > rect.left &&
      newRect.top < rect.top + rect.height &&
      newRect.top + newRect.height > rect.top
    ) {
      return true; // Overlapping found
    }
  }
  return false; // No overlapping found
}
