<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>
      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>
    <div @click="toggleCart()" @keydown="_" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>

  <router-view :inventory="inventory" :add-to-cart="addToCart" />

  <ProductCart
    v-show="showCart"
    :toggle-cart="toggleCart"
    :cart="cart"
    :cart-products="getCartProducts()"
    :remove-item="removeFromCart"
  />
</template>

<script>
import ProductCart from '@/components/ProductCart.vue';
import food from './food.json';

export default {
  components: {
    ProductCart,
  },
  data() {
    return {
      showCart: false,
      inventory: food,
      cart: {},
    };
  },
  mounted() {
    this.inventory.forEach((product) => {
      product.quantity = 1;
      product.price = product.price.USD;
    });
  },
  computed: {
    totalQuantity() {
      return Object.keys(this.cart).length !== 0
        ? Object.values(this.cart).reduce((total, value) => total + value)
        : 0;
    },
  },
  methods: {
    addToCart(i, quantity) {
      const product = this.inventory[i];
      if (!this.cart[product.id]) {
        this.cart[product.id] = 0;
      }
      this.cart[product.id.toString()] += quantity;
    },
    removeFromCart(productId) {
      delete this.cart[productId.toString()];
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    getCartProducts() {
      const cartProducts = [];
      const cartProductIds = Object.keys(this.cart);
      this.inventory.forEach((product) => {
        if (cartProductIds.includes(product.id.toString())) {
          const cartProduct = { ...product };
          cartProduct.quantity = this.cart[product.id.toString()];
          cartProducts.push(cartProduct);
        }
      });
      return cartProducts;
    },
  },
};
</script>
