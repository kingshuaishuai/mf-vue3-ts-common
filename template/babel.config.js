module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    '@vue/babel-plugin-jsx',
    ["import", { "libraryName": "ant-design-vue@next", "libraryDirectory": "es", "style": true }]
  ],
};
