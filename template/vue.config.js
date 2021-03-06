const { GenerateDtsPlugin } = require('@masons/generate-types')
const pkg = require('./package.json')
const deps = pkg.dependencies

const env = process.env.NODE_ENV

function isProd() {
  return env === 'production'
}

module.exports = {
  devServer: {
    port: <%= customInfo.port %>,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
    },
    proxy: ''
  },
  // publicPath: './',
  productionSourceMap: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = pkg.name;
        return args;
      })

      config.optimization.delete('splitChunks')
      /* module federation plugin import */
      config
        .plugin('module-federation-plugin')
        .use(require('webpack').container.ModuleFederationPlugin, [{
          name: "<%= customInfo.moduleName %>",
          filename: "remoteEntry.js",
          remotes: {},
          exposes: {
            // './HelloWorld': './src/components/HelloWorld.tsx'
          },
          shared: {
            ...deps,
            vue: {
              singleton: true,
              requiredVersion: deps["vue"],
            },
            "vue-router": {
              singleton: true,
              requiredVersion: deps["vue-router"],
            },
            vuex: {
              singleton: true,
              requiredVersion: deps["vuex"]
            },
            'ant-design-vue': {
              singleton: true,
              requiredVersion: deps["ant-design-vue"],
            }
          }
      }])

      if (isProd()) {
        config
        .plugin('gdts')
        .use(GenerateDtsPlugin, [{
          savedPath: 'dist',
          moduleName: '<%= customInfo.moduleName %>',
          filename: '<%= customInfo.moduleName %>.d.ts'
        }])
      }
  },
}
