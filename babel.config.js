module.exports = {
  presets: [
    [
      "@babel/env",
      {
        "modules": false,
        "targets": {
          "node": true,
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        },
        "useBuiltIns": "usage"
      }
    ],
    "@vue/app"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-async-to-generator",
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  exclude: [
    "/node_modules/"
  ]
}
