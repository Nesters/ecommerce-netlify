<template>
  <div>
    <section v-if="cartCount > 0">
      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
        <tr v-for="item in checkout.lineItems" :key="item.id">
          <td>
            <img :src="item.variant.image.src | resize({ width: 100 })" :alt="item.title" class="productimg" />
            <h3 class="productname">{{ cartItemTitle(item) }}</h3>
          </td>
          <td>
            <h4 class="price">{{ parseFloat(item.variant.price) | euro }}</h4>
          </td>
          <td>
            <strong>{{ item.quantity }}</strong>
          </td>
          <td>{{ item.quantity * parseFloat(item.variant.price) | euro }}</td>
        </tr>
      </table>

      <section class="payment">
        <div class="discount_box">
        </div>
        <div class="total">
          <div class="caption">
            <p>
              <strong>Subtotal:</strong>
            </p>
            <p>Shipping:</p>
            <p class="golden">Total:</p>
          </div>
          <div class="num">
            <p>
              <strong>{{ cartTotal | euro }}</strong>
            </p>
            <p>Free Shipping</p>
            <p class="golden">{{ cartTotal | euro }}</p>
          </div>
        </div>
      </section>
      <section class="payment">
        <div></div>
        <div class="checkout_container">
          <button class="pay-with-shopify">
            <a :href="checkout.webUrl">Checkout</a>
          </button>
        </div>
      </section>
    </section>

    <section v-else class="center">
      <p>Your cart is empty, fill it up!</p>
      <button class="pay-with-shopify">
        <nuxt-link exact to="/">Back Home</nuxt-link>
      </button>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  components: {
  },
  computed: {
    ...mapState(["checkout"]),
    ...mapGetters(["cartCount", "cartTotal"])
  },
  methods: {
    cartItemTitle(item) {
      return item.variant.title === 'Default Title'
        ? item.title : `${item.title} - ${item.variant.title}`
    }
  }
};
</script>

<style lang="scss" scoped>
.productimg {
  float: left;
  margin-right: 15px;
  width: 100px;
}

.total {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 100px;
}

table {
  width: 100%;
  margin-top: 20px;
}

tr {
  text-align: center;
}

th {
  padding: 10px 0;
}

td,
th {
  border-bottom: 1px solid #ccc;
}

.golden {
  background: #f2eee2;
  font-weight: bold;
  padding: 10px;
}

.productname {
  padding-top: 36px;
  text-align: left;
}

h1 {
  margin-top: 40px;
}

.num {
  text-align: right;
}

button a {
  color: white;
  transition: 0.3s all ease;
}

@media screen and (min-width: 700px) {
  .payment {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 100px;
  }

  .total {
    width: 90%;
  }
}

@media screen and (max-width: 699px) {
  .payment {
    width: 94%;
    margin-left: 2%;
  }
}
</style>