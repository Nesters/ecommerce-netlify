import data from './static/shopifydata.json'

const dynamicRoutes = async () => {
  return new Promise(resolve => {
    resolve(data.map(el => `products/${el.handle}`))
  })
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    script: [{ src: 'https://sdks.shopifycdn.com/js-buy-sdk/v2/latest/index.umd.min.js' }],
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
    ? require('dotenv').config().parsed : {
      storeUrl: process.env.storeUrl,
      storefrontAccessToken: process.env.storefrontAccessToken
    },
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
  plugins: [
    '~/plugins/currency-filter.js',
    { src: '~/plugins/shopifyClient.js', mode: 'client' }
  ],
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
