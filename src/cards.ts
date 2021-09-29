import { CARD_SET, Card, card_sets } from './constants/cards';

export class CardDeck<T extends Card = Card> {
  cards: T[] = [];
  set: CARD_SET = null;
  cursor = 0;
  constructor(set: CARD_SET) {
    this.set = set;
    const cards = card_sets[set];
    if (
    this.cards = [...card_sets[set]];
    this.shuffle();
  }
  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }
  draw(n = 1) {
    const drawn: T[] = [];
    for (let i = 0; i < n; i++) {
      drawn.push(cards[this.cursor]);
      this.cursor = (this.cursor + 1) % this.cards.length;
    }
    return drawn;
  }
}
