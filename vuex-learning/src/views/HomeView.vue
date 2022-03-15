<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="counter" :style="{ color: colorCode }">{{ $store.state.counter }}</div>
    <div>{{ $store.state.counter }}<sup>2</sup> = {{ $store.getters.squareNumber }}</div>
    <div class="buttons">
      <button @click="$store.dispatch('decreaseCounter')">-</button>
      <button @click="$store.dispatch('increaseCounter')">+</button>
    </div>
    <input type="text" placeholder="Color" v-model="colorCode" />
  </div>
</template>

<style scoped>
div {
  margin-bottom: 10px;
}
.counter {
  font-size: 80px;
}
.buttons button {
  font-size: 40px;
  width: 100px;
  margin: 0 10px;
}
</style>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      counter: 0,
    };
  },
  computed: {
    colorCode: {
      get() {
        return this.$store.state.colorCode;
      },
      set(value) {
        this.$store.dispatch('setColorCode', value);
      },
    },
  },
};
</script>
