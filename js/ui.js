export class UIManager {
  constructor(caravan, character) {
    this.caravan = caravan;
    this.character = character;
    this.shopInitiated = false;
    this.attackInitiated = false;
    this.goodInitiated = false;
  }

  notify(message, type) {
    const updatesArea = document.getElementById('updates-area');
    if (!updatesArea) return;

    const notification = document.createElement('div');
    notification.className = `update-${type}`;
    notification.innerHTML = `${Math.ceil(this.caravan.day)}. Nap: ${message}`;
    
    updatesArea.insertBefore(notification, updatesArea.firstChild);
    
    // Limit number of notifications
    const notifications = updatesArea.children;
    if (notifications.length > 20) {
      updatesArea.removeChild(notifications[notifications.length - 1]);
    }
  }

  refreshStats() {
    const elements = {
      'stat-day': Math.ceil(this.caravan.day),
      'stat-distance': Math.floor(this.caravan.distance),
      'stat-crew': this.caravan.csapattag,
      'stat-oxen': this.caravan.ökör,
      'stat-food': Math.ceil(this.caravan.étel),
      'stat-liquid': Math.ceil(this.caravan.folyadék),
      'stat-money': this.caravan.gold,
      'stat-firepower': this.caravan.tűzerő,
      'stat-weight': `${Math.ceil(this.caravan.weight)}/${this.caravan.capacity}`
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = value;
      }
    });

    // Update caravan position
    const caravanElement = document.getElementById('caravan');
    if (caravanElement) {
      const progressPercent = (this.caravan.distance / 5000) * 100;
      caravanElement.style.left = `${Math.min(progressPercent * 3.8, 380)}px`;
    }

    // Update character info if available
    if (this.character) {
      this.updateCharacterDisplay();
    }
  }

  updateCharacterDisplay() {
    const characterInfo = document.getElementById('character-info');
    if (characterInfo) {
      characterInfo.innerHTML = `
        <div class="character-stats">
          <div>Level: ${this.character.stats.level}</div>
          <div>XP: ${this.character.stats.xp}/50</div>
          <div>HP: ${this.character.stats.hp}</div>
          <div>Damage: ${this.character.stats.physDmg}</div>
          <div>Armor: ${this.character.stats.armor}</div>
        </div>
      `;
    }
  }

  showShop(products) {
    const shopDiv = document.getElementById('shop');
    if (!shopDiv) return;

    shopDiv.classList.remove('hidden');

    if (!this.shopInitiated) {
      shopDiv.addEventListener('click', (e) => {
        const target = e.target;

        if (target.tagName === 'BUTTON') {
          shopDiv.classList.add('hidden');
          if (this.game) {
            this.game.resumeJourney();
          }
        } else if (target.classList.contains('product')) {
          const productData = {
            item: target.dataset.item,
            qty: parseInt(target.dataset.qty),
            price: parseInt(target.dataset.price)
          };

          if (this.buyProduct(productData)) {
            target.style.opacity = '0.5';
            target.style.pointerEvents = 'none';
          }
        }
      });

      this.shopInitiated = true;
    }

    const prodsDiv = document.getElementById('prods');
    if (prodsDiv) {
      prodsDiv.innerHTML = '';
      
      products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.dataset.qty = product.qty;
        productElement.dataset.item = product.item;
        productElement.dataset.price = product.price;
        productElement.innerHTML = `${product.qty} ${product.item} - $${product.price}`;
        prodsDiv.appendChild(productElement);
      });
    }
  }

  buyProduct(product) {
    if (product.price > this.caravan.gold) {
      this.notify('Nincs elég golded!', 'negative');
      return false;
    }

    this.caravan.gold -= product.price;
    
    if (this.caravan.stats[product.item] !== undefined) {
      this.caravan.stats[product.item] += product.qty;
    }

    this.notify(`Vásároltál ${product.qty} x ${product.item}`, 'positive');
    
    this.caravan.updateWeight();
    this.refreshStats();
    
    return true;
  }

  showAttack(tűzerő, gold) {
    const attackDiv = document.getElementById('attack');
    if (!attackDiv) return;

    attackDiv.classList.remove('hidden');
    
    const attackDesc = document.getElementById('attack-description');
    if (attackDesc) {
      attackDesc.innerHTML = `Ellenség tűzereje: ${tűzerő}<br>Saját tűzerőd: ${this.caravan.tűzerő}`;
    }

    if (!this.attackInitiated) {
      const fightBtn = document.getElementById('fight');
      const runawayBtn = document.getElementById('runaway');

      if (fightBtn) {
        fightBtn.addEventListener('click', () => this.fight(tűzerő, gold));
      }

      if (runawayBtn) {
        runawayBtn.addEventListener('click', () => this.runaway(tűzerő));
      }

      this.attackInitiated = true;
    }

    // Store enemy stats for use in fight/runaway
    this.enemyFirepower = tűzerő;
    this.enemyGold = gold;
  }

  fight(enemyFirepower, gold) {
    const playerAdvantage = this.caravan.tűzerő - enemyFirepower;
    const damage = Math.ceil(Math.max(0, 
      enemyFirepower * (0.5 + Math.random() * 0.5) - playerAdvantage * 0.2
    ));

    if (damage < this.caravan.csapattag) {
      this.caravan.csapattag -= damage;
      this.caravan.gold += gold;
      this.notify(`Győztél! ${damage} embered halt meg. Találtál $${gold}`, 'positive');
    } else {
      this.caravan.csapattag = 0;
      this.notify('Mindenki meghalt a csatában! Vesztettél!', 'negative');
    }

    document.getElementById('attack').classList.add('hidden');
    if (this.game) {
      this.game.resumeJourney();
    }
  }

  runaway(enemyFirepower) {
    const damage = Math.ceil(Math.max(0, enemyFirepower * Math.random() * 0.3));

    if (damage < this.caravan.csapattag) {
      this.caravan.csapattag -= damage;
      this.notify(`Sikeresen elmenekültél! ${damage} ember halt meg a menekülés során.`, 'negative');
    } else {
      this.caravan.csapattag = 0;
      this.notify('Mindenki meghalt a menekülés során!', 'negative');
    }

    document.getElementById('attack').classList.add('hidden');
    if (this.game) {
      this.game.resumeJourney();
    }
  }

  showGood(bonus) {
    const goodDiv = document.getElementById('good');
    if (!goodDiv) return;

    goodDiv.classList.remove('hidden');
    
    const goodDesc = document.getElementById('good-description');
    if (goodDesc) {
      goodDesc.innerHTML = `Egy rejtélyes öregúr kínál neked ajándékot!`;
    }

    if (!this.goodInitiated) {
      const acceptBtn = document.getElementById('accept');
      const declineBtn = document.getElementById('decline');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => this.accept());
      }

      if (declineBtn) {
        declineBtn.addEventListener('click', () => this.decline());
      }

      this.goodInitiated = true;
    }
  }

  accept() {
    const gotFood = Math.floor(Math.random() * 20) + 10;
    this.caravan.étel += gotFood;
    this.notify(`Az öregúr adott neked ${gotFood} ételt!`, 'positive');

    document.getElementById('good').classList.add('hidden');
    if (this.game) {
      this.game.resumeJourney();
    }
  }

  decline() {
    this.notify('Nem fogadtad el az öregúr ajánlatát!', 'neutral');
    
    document.getElementById('good').classList.add('hidden');
    if (this.game) {
      this.game.resumeJourney();
    }
  }
}
