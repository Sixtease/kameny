import { CardPackage, card_sets } from './constants/cards';

export class CardDeck<T extends CardPackage = CardPackage> {
  cards: T['Card'][] = [];
  set: T['Set'] = null;
  cursor = 0;
  constructor(set: T['Set'], cards?: T['Card'][], cursor?: number) {
    this.set = set;
    if (cards) {
      this.cards = cards
    } else {
      this.cards = [...card_sets[set]];
      this.shuffle();
    }
    if (cursor) this.cursor = cursor;
  }
  shuffle() {
    let i = this.cards.length;
    while (i > 0) {
      let r = Math.floor(Math.random() * i);
      i--;
      [this.cards[i], this.cards[r]] = [this.cards[r], this.cards[i]];
    }
  }
  draw(n = 1): T['Card'][] {
    const drawn: T['Card'][] = [];
    for (let i = 0; i < n; i++) {
      drawn.push(this.cards[this.cursor]);
      this.cursor = (this.cursor + 1) % this.cards.length;
    }
    return drawn;
  }
}
