import { CARD_SET, Card } from '../constants/cards';

export function prefetch(set: CARD_SET, cards: Card[], cursor: number): void {
  const cardToPrefetch = cards.at(cursor);
  let image = new Image();
  image.src = `/assets/cards/${set}/${cardToPrefetch}.jpg`;
  image.onload = () => {
    console.log(`Prefetched image for card: ${cardToPrefetch}`);
  };
  image.onerror = () => {
    console.error(`Failed to prefetch image for card: ${cardToPrefetch}`);
  };
  image = null; // Clear the reference to free memory
}
