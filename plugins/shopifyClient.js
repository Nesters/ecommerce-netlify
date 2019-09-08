import Vue from 'vue'

Vue.prototype.shopifyClient = window.ShopifyBuy.buildClient({
  domain: process.env.storeUrl,
  storefrontAccessToken: process.env.storefrontAccessToken
});
