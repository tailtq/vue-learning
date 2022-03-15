<template>
  <aside class="cart-container">
    <div class="cart">
      <h1 class="cart-title spread">
        <span>
          Cart
          <i class="icofont-cart-alt icofont-1x"></i>
        </span>
        <button class="cart-close" @click="toggleCart()">&times;</button>
      </h1>

      <div class="cart-body">
        <table class="cart-table">
          <thead>
            <tr>
              <th><span class="sr-only">Product Image</span></th>
              <th class="left">Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cartProducts" :key="product.id">
              <td><i class="icofont-3x" :class="'iconfont-' + product.icon"></i></td>
              <td class="left">{{ product.name }}</td>
              <td class="center">${{ product.price }}</td>
              <td class="center">{{ product.quantity }}</td>
              <td class="center">${{ getProductPrice(product.price, product.quantity) }}</td>
              <td class="center">
                <button class="btn btn-light cart-remove" @click="removeItem(product.id)">
                  &times;
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="center" v-if="cartProducts.length === 0"><em>No items in cart</em></p>

        <div class="spread">
          <span><strong>Total:</strong> \${{ getTotalPrice() }}</span>
          <button class="btn btn-light">Checkout</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ProductCart',
  props: ['toggleCart', 'cart', 'cartProducts', 'removeItem'],
  methods: {
    getProductPrice(unitPrice, quantity) {
      return unitPrice * quantity;
    },
    getTotalPrice() {
      let price = 0.0;
      this.cartProducts.forEach((product) => {
        price += this.getProductPrice(product.price, product.quantity);
      });
      return price.toFixed(2);
    },
  },
};
</script>
