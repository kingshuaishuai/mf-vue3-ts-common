const pkg = require('./package.json')
const deps = pkg.dependencies

module.exports = {
  // devServer: {
  //   proxy: ''
  // },
  publicPath: './',
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

    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          library: { type: "var", name: "<%= customInfo.moduleName %>" },
          name: "<%= customInfo.moduleName %>",
          filename: "remoteEntry.js",
          remotes: {},
          exposes: {},
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
          },
        },
      ]);
  },
}
