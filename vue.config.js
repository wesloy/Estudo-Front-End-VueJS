module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: 'http://10.200.54.184:8080/'
    // proxy: 'http://10.200.54.184:5200'    
    // proxy: 'https://localhost:5001'
    // proxy: 'http://localhost:5000'
  }
  // devServer: {
  //   proxy: {
  //     '/V1': {
  //         target: 'http://10.200.54.184:5200/api/', // 'endpoint ao qual você quer que seja feito o proxy/redirecionamento'
  //         pathRewrite: {'^/v1': ''},
  //         // changeOrigin: true,
  //         // secure: false
  //     },
  //     '/V2': {
  //         target: 'https://localhost:5001/api/',          
  //         pathRewrite: {
  //             '^/v2': ''
  //         }
  //     },
  //   }
  // }
}