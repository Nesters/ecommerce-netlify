const fs = require('fs');
const fetch = require('isomorphic-fetch');
const Client = require('shopify-buy');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config().parsed
}

const fetchShopifyProducts = async () => {
  console.log('Fetching products from Shopify');
  const client = Client.buildClient({
    domain: process.env.storeUrl,
    storefrontAccessToken: process.env.storefrontAccessToken
  });

  let products = await client.product.fetchAll(60)
  let collections = await client.collection.fetchAllWithProducts()
  products = products.map(
    product => {
      const newProduct = { ...product }
      newProduct.img = product.images.length > 0 ? product.images[0].src : null
      newProduct.collections = collections.reduce(
        (acc, collection) => {
          if (collection.products.filter(prod => prod.id === product.id).length > 0) {
            acc.push(collection.handle)
          }
          return acc
        }, []
      )
      // Reduce bundle size
      newProduct.type = null
      newProduct.images = product.images.map(
        image => {
          const newImage = { ...image }
          newImage.type = null

          return newImage
        }
      )
      newProduct.options = product.options.map(
        option => {
          const newOption = { ...option }
          newOption.type = null

          return newOption
        }
      )
      newProduct.variants = product.variants.map(
        variant => {
          const newVariant = { ...variant }
          newVariant.presentmentPrices = null
          newVariant.type = null

          return newVariant
        }
      )
      

      return newProduct;
    }
  );
  collections = collections.map(
    collection => {
      const newCollection = { ...collection }
      newCollection.products = [] // Reduce bundle size by simplifying logic
      return newCollection
    }
  )
  console.log('Writing products to data file')
  fs.writeFileSync('./static/shopifydata.json', JSON.stringify({ products, collections }, null, 2))
};

fetchShopifyProducts();
