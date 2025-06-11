import { ITEMS } from './character.js';

export const EVENT_TYPES = [
  // Basic stat change events
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'étel',
    value: -3,
    text: 'Megromlott az étel. Veszteség: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'ökör',
    value: 3,
    text: 'Új ökrök születtek a Caravánban! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'étel',
    value: 30,
    text: 'Találtál egy nemrég óta halott szarvast! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'gold',
    value: 50,
    text: 'Észrevettél egy csillogó követ a fa alatt! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'folyadék',
    value: 30,
    text: 'Egy forráshoz értél! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'csapattag',
    value: 5,
    text: 'Találtál egy csapat túlélőt az erdőben! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'csapattag',
    value: -4,
    text: 'Fertőzés veszély. Veszteség: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'gold',
    value: -50,
    text: 'Megloptak a zsebtolvajok! $'
  },

  // NEW ITEM REWARD EVENTS
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'A medvével való harc után levágod a fejét és sapkát készítesz belőle!',
    item: 'bearHead',
    xp: 25
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive', 
    text: 'Egy elhagyott kovács műhelyben találsz egy jól megkovácsolt acél kardot!',
    item: 'steelSword',
    xp: 15
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Legyőzöl egy rablóvezért és megszerezd a vértvértét!',
    item: 'chainmail',
    xp: 30
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy rejtélyes kereskedő ajándékoz neked egy varázskövet!',
    item: 'magicAmulet',
    xp: 20
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Az elhagyott kastélyban találsz egy királyi gyűrűt!',
    item: 'royalRing',
    xp: 25
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy vadász táborában találsz kiváló minőségű bőr kesztyűt!',
    item: 'leatherGloves',
    xp: 10
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Megmentesz egy kovácsot a rablóktól, aki hálából készít neked egy övét!',
    item: 'reinforcedBelt',
    xp: 15
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy sárkány barlangban találsz egy ősi sisakot!',
    item: 'dragonHelmet',
    xp: 40
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Az erdő mélyén egy tündér ajándékoz neked varázslatos csizmát!',
    item: 'elfBoots',
    xp: 20
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy bátor harcosnak segítesz, aki jutalmul átad neked egy harci kesztyűt!',
    item: 'battleGauntlets',
    xp: 20
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'A tó fenekén csillogó tárgyat látsz - egy értékes amulett!',
    item: 'waterAmulet',
    xp: 15
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy haldokló lovag rád hagyja legendás kardját!',
    item: 'legendSword',
    xp: 50
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Az ősi templom oltáránál találsz egy szent gyűrűt!',
    item: 'holyRing',
    xp: 30
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy kobold törzsnek segítesz, akik egy varázs övvel fizetnek!',
    item: 'magicBelt',
    xp: 25
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Az elhagyott fegyvertárban találsz egy tökéletes állapotú vas sisakot!',
    item: 'ironHelmet',
    xp: 15
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy rejtélyes barlangban találsz egy varázslatos övét!',
    item: 'mysticBelt',
    xp: 20
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy elhagyott vadász kunyhóban találsz egy tökéletes íjat!',
    item: 'hunterBow',
    xp: 25
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Megmentesz egy tündért, aki egy varázslatos gyűrűvel jutalmaz!',
    item: 'elfRing',
    xp: 35
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy ősi kincskamrában találsz egy rubinköves amulette!',
    item: 'rubyAmulet',
    xp: 40
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Legyőzöl egy orkot és elveszed a vastag bőr vértjét!',
    item: 'orcArmor',
    xp: 30
  },
  {
    type: 'ITEM-REWARD',
    notification: 'positive',
    text: 'Egy mágikus forrásból egy kristálysisakot halászol ki!',
    item: 'crystalHelmet',
    xp: 45
  },

  // CHOICE EVENTS
  {
    type: 'CHOICE',
    notification: 'neutral',
    text: 'Egy titokzatos kereskedő kínál neked egy alkut...',
    choices: [
      {
        text: 'Elfogadom az arany ajánlatát',
        effect: { type: 'STAT-CHANGE', stat: 'gold', value: 100 }
      },
      {
        text: 'Inkább a fegyvert választom',
        effect: { type: 'ITEM-REWARD', item: 'steelSword' }
      },
      {
        text: 'Elutasítom és megyek tovább',
        effect: { type: 'STAT-CHANGE', stat: 'étel', value: 10 }
      }
    ]
  },
  {
    type: 'CHOICE',
    notification: 'neutral', 
    text: 'Egy sebesült harcos segítséget kér...',
    choices: [
      {
        text: 'Segítek neki (étel költség)',
        effect: { type: 'ITEM-REWARD', item: 'battleGauntlets', cost: { stat: 'étel', value: 20 } }
      },
      {
        text: 'Meggyógyítom (folyadék költség)',
        effect: { type: 'ITEM-REWARD', item: 'holyRing', cost: { stat: 'folyadék', value: 15 } }
      },
      {
        text: 'Tovább megyek',
        effect: { type: 'NO-EFFECT' }
      }
    ]
  },
  {
    type: 'CHOICE',
    notification: 'neutral',
    text: 'Egy öregember felajánl, hogy elárulja egy kincs helyét...',
    choices: [
      {
        text: 'Fizetek 50 aranyat az információért',
        effect: { type: 'ITEM-REWARD', item: 'dragonHelmet', cost: { stat: 'gold', value: 50 } }
      },
      {
        text: 'Megpróbálom rábeszélni (csapattag kockázat)',
        effect: { type: 'RISK', risk: { stat: 'csapattag', value: -2 }, reward: { type: 'ITEM-REWARD', item: 'treasureChest' } }
      },
      {
        text: 'Nem érdekel',
        effect: { type: 'NO-EFFECT' }
      }
    ]
  },

  // SHOP EVENTS
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'Találtál egy boltot!',
    products: [
      { item: 'étel', qty: 20, price: 50 },
      { item: 'ökör', qty: 1, price: 200 },
      { item: 'tűzerő', qty: 2, price: 50 },
      { item: 'csapattag', qty: 5, price: 80 }
    ]
  },
  {
    type: 'SHOP',
    notification: 'neutral',
    text: 'A csempészek jó dolgokat árulnak!',
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
  constructor(caravan, ui, game, inventoryManager) {
    this.caravan = caravan;
    this.ui = ui;
    this.game = game;
    this.inventoryManager = inventoryManager;
  }

  generateEvent() {
    const eventIndex = Math.floor(Math.random() * EVENT_TYPES.length);
    const eventData = EVENT_TYPES[eventIndex];

    switch (eventData.type) {
      case 'STAT-CHANGE':
        this.handleStatChangeEvent(eventData);
        break;
      case 'ITEM-REWARD':
        this.handleItemRewardEvent(eventData);
        break;
      case 'CHOICE':
        this.handleChoiceEvent(eventData);
        break;
      case 'SHOP':
        this.handleShopEvent(eventData);
        break;
      case 'ATTACK':
        this.handleAttackEvent(eventData);
        break;
      case 'GOOD':
        this.handleGoodEvent(eventData);
        break;
    }
  }

  handleStatChangeEvent(eventData) {
    if (eventData.value + this.caravan.stats[eventData.stat] >= 0) {
      this.caravan.stats[eventData.stat] += eventData.value;
      this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
    }
  }

  handleItemRewardEvent(eventData) {
    const item = ITEMS[eventData.item];
    if (item) {
      const success = this.inventoryManager.addItemToBackpack(item);
      if (success) {
        this.ui.notify(eventData.text, eventData.notification);
        if (eventData.xp) {
          this.inventoryManager.character.gainXp(eventData.xp);
          this.ui.notify(`+${eventData.xp} XP gained!`, 'positive');
        }
      } else {
        this.ui.notify('Your backpack is full! Item lost.', 'negative');
      }
    }
  }

  handleChoiceEvent(eventData) {
    this.game.pauseJourney();
    this.ui.notify(eventData.text, eventData.notification);
    // Note: Choice UI implementation needed in ui.js
    this.processChoiceEffect(eventData.choices[0].effect); // For now, auto-select first choice
    this.game.resumeJourney();
  }

  processChoiceEffect(effect) {
    switch (effect.type) {
      case 'STAT-CHANGE':
        this.caravan.stats[effect.stat] += effect.value;
        this.ui.notify(`Gained ${effect.value} ${effect.stat}`, 'positive');
        break;
      case 'ITEM-REWARD':
        const item = ITEMS[effect.item];
        if (item && this.inventoryManager.addItemToBackpack(item)) {
          this.ui.notify(`Found ${item.name}!`, 'positive');
        } else {
          this.ui.notify('Backpack full or item not found!', 'negative');
        }
        break;
    }
  }

  handleShopEvent(eventData) {
    this.game.pauseJourney();
    this.ui.notify(eventData.text, eventData.notification);
    
    const numProds = Math.ceil(Math.random() * 4);
    const products = [];
    
    for (let i = 0; i < numProds; i++) {
      const randomProduct = eventData.products[Math.floor(Math.random() * eventData.products.length)];
      const priceFactor = 0.7 + 0.6 * Math.random();
      
      products.push({
        item: randomProduct.item,
        qty: randomProduct.qty,
        price: Math.round(randomProduct.price * priceFactor)
      });
    }
    
    this.ui.showShop(products);
  }

  handleAttackEvent(eventData) {
    this.game.pauseJourney();
    this.ui.notify(eventData.text, eventData.notification);
    
    const enemyFirepower = Math.round((0.7 + 0.6 * Math.random()) * 5);
    const enemyGold = Math.round((0.7 + 0.6 * Math.random()) * 50);
    
    this.ui.showAttack(enemyFirepower, enemyGold);
  }

  handleGoodEvent(eventData) {
    this.game.pauseJourney();
    this.ui.notify(eventData.text, eventData.notification);
    this.ui.showGood();
  }
}
