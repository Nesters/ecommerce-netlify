const fs = require('fs');
const fetch = require('isomorphic-fetch');
const Client = require('shopify-buy');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config().parsed
}

const fetchShopifyProducts = async () => {
  console.log('Fetching products from Shopify');
  const client = Client.buildClient({
    domain: process.env.storeUrl,
    storefrontAccessToken: process.env.storefrontAccessToken
  });

  let products = await client.product.fetchAll();
  products = products.map(
    product => {
      product.img = product.images.length > 0 ? product.images[0].src : null;

      return product;
    }
  );
  console.log('Writing products to data file');
  fs.writeFileSync('./static/shopifydata.json', JSON.stringify(products, null, 2));
};

fetchShopifyProducts();
