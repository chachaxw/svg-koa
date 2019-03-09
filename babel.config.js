module.exports = {
  presets: [
    "@babel/env",
    "@vue/app"
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2
      }
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
