import fs from 'fs'
import fetch from 'isomorphic-fetch'
import Client from 'shopify-buy'

const dynamicRoutes = async () => {
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
  fs.writeFileSync('./static/shopifydata.json', JSON.stringify(products, null, 2));

  return new Promise(resolve => {
    resolve(products.map(el => `products/${el.handle}`))
  })
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
      }
    ]
  },
  generate: {
    routes: dynamicRoutes
  },
  env: process.env.NODE_ENV === 'development'
    ? require('dotenv').config().parsed : {},
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css', { src: '~/assets/main.scss', lang: 'sass' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [`~/plugins/currency-filter.js`],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
