export const EVENT_TYPES = [
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
    stat: 'ökör',
    value: 1,
    text: 'Találtál egy elkóborolt ökröt! '
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
    stat: 'étel',
    value: 20,
    text: 'Elhagyott madártojásokra bukkantál! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'étel',
    value: 10,
    text: 'A kocsi kereke megakadt egy ehető gyökérben! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'étel',
    value: 10,
    text: 'Mézet találtál az egyik fán! '
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
    stat: 'gold',
    value: 30,
    text: 'Egy holttestet találtál az út szélén, arannyal a zsebében! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'tűzerő',
    value: 3,
    text: 'Az út szélén áll egy elhagyott kocsi tele puskaporral! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'tűzerő',
    value: 2,
    text: 'Egy üres táborban találtál fegyvereket és lőszert! '
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
    notification: 'positive',
    stat: 'csapattag',
    value: 6,
    text: 'Vándorok csatlakoztak a Caravánodhoz! '
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
    stat: 'folyadék',
    value: 20,
    text: 'Találtál az erdőben egy kutat! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'positive',
    stat: 'folyadék',
    value: 10,
    text: 'Elkezdett esni az eső! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'folyadék',
    value: -20,
    text: 'A vízkészleted megfertőződött! '
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
    stat: 'étel',
    value: -10,
    text: 'Féreg fertőzés. Elvesztett élelem: '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'gold',
    value: -50,
    text: 'Megloptak a zsebtolvajok! $'
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'étel',
    value: -30,
    text: 'A mosómedvék ellopták az ételedet! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'csapattag',
    value: -5,
    text: 'A csapatodra esett egy fa! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'ökör',
    value: -4,
    text: 'Beestek az ökreid a mocsárba! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'ökör',
    value: -2,
    text: 'Elszabadultak az ökreid! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'tűzerő',
    value: -4,
    text: 'Eláztak a fegyvereid! '
  },
  {
    type: 'STAT-CHANGE',
    notification: 'negative',
    stat: 'csapattag',
    value: -4,
    text: 'Megtámadtak a farkasok! '
  },
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
    text: 'Találtál egy boltot!',
    products: [
      { item: 'étel', qty: 30, price: 50 },
      { item: 'ökör', qty: 1, price: 200 },
      { item: 'tűzerő', qty: 2, price: 20 },
      { item: 'csapattag', qty: 10, price: 80 }
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
  {
    type: 'GOOD',
    notification: 'positive',
    text: 'Találkoztál egy rejtélyes öregúrral!'
  }
];

export class EventManager {
  constructor(caravan, ui, game) {
    this.caravan = caravan;
    this.ui = ui;
    this.game = game;
  }

  generateEvent() {
    const eventIndex = Math.floor(Math.random() * EVENT_TYPES.length);
    const eventData = EVENT_TYPES[eventIndex];

    switch (eventData.type) {
      case 'STAT-CHANGE':
        this.handleStatChangeEvent(eventData);
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

  handleShopEvent(eventData) {
    this.game.pauseJourney();
    this.ui.notify(eventData.text, eventData.notification);
    
    // Generate random products
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
