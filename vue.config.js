// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            'primary-color': '#033254',
            'link-color': '#033254',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  // pwa: { //CACHE PWA
  //   workboxOptions: {
  //     skipWaiting: true
  //   }
  // }
};