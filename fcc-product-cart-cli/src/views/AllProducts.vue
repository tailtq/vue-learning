<template>
  <main class="wrapper">
    <h1>Products</h1>

    <div class="card-container">
      <ProductCard
        v-for="(product, i) in inventory"
        :key="i"
        :index="i"
        :product="product"
        :add-to-cart="addToCart"
      />
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'AllProducts',
  props: ['inventory', 'addToCart'],
  components: {
    ProductCard,
  },
};
</script>
