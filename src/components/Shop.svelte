<script>
  import { createEventDispatcher } from 'svelte';
  import { caravanStats, gameState, addMessage } from '../stores/gameStore.js';

  const dispatch = createEventDispatcher();

  let products = [];

  gameState.subscribe(state => {
    if (state.showShop && state.currentEvent) {
      const numProds = Math.ceil(Math.random() * 4);
      products = [];
      
      for (let i = 0; i < numProds; i++) {
        const randomProduct = state.currentEvent.products[Math.floor(Math.random() * state.currentEvent.products.length)];
        const priceFactor = 0.7 + 0.6 * Math.random();
        
        products.push({
          item: randomProduct.item,
          qty: randomProduct.qty,
          price: Math.round(randomProduct.price * priceFactor)
        });
      }
    }
  });

  function buyProduct(product) {
    caravanStats.update(stats => {
      if (product.price > stats.gold) {
        addMessage('Nincs elég aranyad!', 'negative');
        return stats;
      }

      stats.gold -= product.price;
      
      if (stats[product.item] !== undefined) {
        stats[product.item] += product.qty;
      }

      addMessage(`Vásároltál ${product.qty} x ${product.item}`, 'positive');
      
      // Update weight
      stats.capacity = stats.ökör * 23 + stats.csapattag * 2;
      stats.weight = stats.étel * 0.6 + stats.tűzerő * 5;

      return stats;
    });

    // Remove bought product from list
    products = products.filter(p => p !== product);
  }

  function closeShop() {
    dispatch('close');
  }
</script>

<div class="shop-overlay">
  <div class="shop">
    <h2>Kereskedő</h2>
    
    <div class="products">
      {#each products as product}
        <div class="product" on:click={() => buyProduct(product)}>
          <div class="product-info">
            <span class="product-name">{product.item}</span>
            <span class="product-qty">Qty: {product.qty}</span>
            <span class="product-price">Price: {product.price} arany</span>
          </div>
        </div>
      {/each}
      
      {#if products.length === 0}
        <div class="no-products">
          Minden termék elfogyott!
        </div>
      {/if}
    </div>
    
    <button type="button" class="btn exit" on:click={closeShop}>
      Bolt elhagyása
    </button>
  </div>
</div>

<style>
  .shop-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .shop {
    width: 500px;
    max-height: 600px;
    background-color: #FFD700;
    border: 5px solid #8B4513;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  }

  .shop h2 {
    color: #8B4513;
    text-align: center;
    margin: 0 0 20px 0;
  }

  .products {
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .product {
    background-color: #D2B48C;
    border: 2px solid #8B4513;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .product:hover {
    background-color: #DEB887;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .product-name {
    font-weight: bold;
    color: #8B4513;
    font-size: 16px;
  }

  .product-qty,
  .product-price {
    color: #654321;
    font-size: 14px;
  }

  .no-products {
    text-align: center;
    color: #8B4513;
    font-style: italic;
    padding: 20px;
  }

  .btn {
    background-color: #8B4513;
    border: 2px solid #654321;
    border-radius: 8px;
    color: #FFD700;
    padding: 12px 16px;
    text-align: center;
    display: block;
    width: 100%;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .btn:hover {
    background-color: #A0522D;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }

  .exit {
    background-color: #DC143C;
    border-color: #B22222;
  }

  .exit:hover {
    background-color: #B22222;
  }
</style>
