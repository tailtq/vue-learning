let app = Vue.createApp({
    data() {
        return {
            showCart: false,
            inventory: [],
            cart: {},
        };
    },
    computed: {
        totalQuantity() {
            return Object.keys(this.cart).length !== 0 ? Object.values(this.cart).reduce((total, value) => total + value) : 0;
        },
    },
    methods: {
        addToCart(i) {
            const product = this.inventory[i];
            if (!this.cart[product.id]) {
                this.cart[product.id] = 0;
            }
            this.cart[product.id.toString()] += product.quantity;
            product.quantity = 1;
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
            this.inventory.forEach((product, i) => {
                if (cartProductIds.includes(product.id.toString())) {
                    const cartProduct = { ...product };
                    cartProduct.quantity = this.cart[product.id.toString()];
                    cartProducts.push(cartProduct);
                }
            });
            return cartProducts;
        },
    },
    async mounted() {
        const res = await fetch('./food.json');
        this.inventory = await res.json();
        this.inventory.forEach((product) => {
            product.quantity = 1;
            product.price = product.price.USD;
        });
    },
});
app.component('cart', {
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
    template: `
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
                <tr v-for="product in cartProducts">
                    <td><i class="icofont-3x" :class="'iconfont-' + product.icon"></i></td>
                    <td class="left">{{ product.name }}</td>
                    <td class="center">\${{ product.price }}</td >
                    <td class="center">{{ product.quantity }}</td>
                    <td class="center">\${{ getProductPrice(product.price, product.quantity) }}</td>
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
            </div >
        </div >
        </aside >
    `,
});
app.component('navbar', {
    props: ['totalQuantity', 'toggleCart'],
    template: `
        <header class="top-bar spread">
            <nav class="top-bar-nav">
                <a href="#" class="top-bar-link">
                    <i class="icofont-spoon-and-fork"></i>
                    <span>Home</span>
                </a>
                <a href="views/products.html" class="top-bar-link">
                    <span>Products</span>
                </a>
                <a href="views/past-orders.html" class="top-bar-link">
                    <span>Past Orders</span>
                </a>
            </nav>
            <a @click="toggleCart()" class="top-bar-cart-link">
                <i class="icofont-cart-alt icofont-1x"></i>
                <span>Cart ({{ totalQuantity }})</span>
            </a>
        </header>
    `
});
app.mount('#app');
