import { CardPackage, card_sets } from './constants/cards';

export class CardDeck<T extends CardPackage = CardPackage> {
  cards: T['Card'][] = [];
  set: T['Set'] = null;
  cursor = 0;
  constructor(set: T['Set']) {
    this.set = set;
    this.cards = [...card_sets[set]];
    this.shuffle();
  }
  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }
  draw(n = 1) {
    const drawn: T['Card'][] = [];
    for (let i = 0; i < n; i++) {
      drawn.push(this.cards[this.cursor]);
      this.cursor = (this.cursor + 1) % this.cards.length;
    }
    return drawn;
  }
}
