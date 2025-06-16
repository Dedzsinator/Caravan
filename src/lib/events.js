import { ITEMS } from './items.js';

// Event types with their data
export const EVENT_TYPES = [
  // STAT-CHANGE EVENTS
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    text: 'Elesettek az utadon: -',
    stat: 'csapattag',
    value: -3
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    text: 'Az egyik ökröd elpusztult: -',
    stat: 'ökör',
    value: -1
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    text: 'Találtál aranyat: +',
    stat: 'gold',
    value: 25
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    text: 'Új emberek csatlakoztak: +',
    stat: 'csapattag',
    value: 5
  },

  // ITEM-REWARD EVENTS
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy medve megtámadott téged! Sikerült legyőznöd és a fejéből sisakot készítettél.',
    item: 'bearHead',
    xp: 15
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy öreg kovács adott neked egy vasisakot cserébe segítségért.',
    item: 'ironHelmet',
    xp: 10
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy titokzatos kereskedő megajándékozott egy mágikus amulettel.',
    item: 'magicAmulet',
    xp: 20
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy elűzött tolvaj elhagyta acélkardját, amit magadhoz vettél.',
    item: 'steelSword',
    xp: 12
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy sárkány barlangjában találtál egy legendás sisakot!',
    item: 'dragonHelmet',
    xp: 30
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Megmentettél egy elf harcos életét, aki hálája jeléül adott neked egy pár különleges csizmát.',
    item: 'elfBoots',
    xp: 18
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy varázslóval találkoztál, aki kristály sisakkal jutalmazott egy jó tett elvégzéséért.',
    item: 'crystalHelmet',
    xp: 25
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy királyi gyűrűt találtál egy régi romok között.',
    item: 'royalRing',
    xp: 22
  },

  // CHOICE EVENTS
  {
    type: 'CHOICE',
    notification: 'neutral',
    text: 'Egy elágazáshoz értél. Melyik utat válaszod?',
    choices: [
      {
        text: 'Biztonságos út',
        effect: { type: 'STAT-CHANGE', stat: 'étel', value: -5 }
      },
      {
        text: 'Veszélyes út',
        effect: { type: 'ITEM-REWARD', item: 'ironSword' }
      }
    ]
  },

  // SHOP EVENTS
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Kereskedőkkel találkoztál!',
    products: [
      { item: 'étel', qty: 30, price: 10 },
      { item: 'ökör', qty: 3, price: 50 },
      { item: 'tűzerő', qty: 7, price: 20 },
      { item: 'csapattag', qty: 10, price: 30 }
    ]
  },

  // ATTACK EVENTS
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'A banditák támadnak!'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'A sheriffel találkoztál!'
  },
  {
    type: 'ATTACK',
    notification: 'negative',
    text: 'Megtámadtak a farkasok!'
  },

  // GOOD EVENTS
  {
    type: 'GOOD',
    notification: 'positive',
    text: 'Találkoztál egy rejtélyes öregúrral!'
  }
];

export class EventManager {
  constructor() {
    this.currentEvent = null;
  }

  generateRandomEvent() {
    const eventIndex = Math.floor(Math.random() * EVENT_TYPES.length);
    return EVENT_TYPES[eventIndex];
  }

  getEventById(id) {
    return EVENT_TYPES[id];
  }

  getItemRewardEvents() {
    return EVENT_TYPES.filter(event => event.type === 'ITEM-REWARD');
  }

  getShopEvents() {
    return EVENT_TYPES.filter(event => event.type === 'SHOP');
  }
}
