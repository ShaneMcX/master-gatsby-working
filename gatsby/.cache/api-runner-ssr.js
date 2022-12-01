var plugins = [{
      plugin: require('/Users/shane/master-gatsby/working/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/shane/master-gatsby/working/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"yph4nxmq","dataset":"production","watchMode":true,"token":"skai9jXu38afsMHjdOUoo8IwizpPkzUHuJEgSKerb3GOWAFN2m39eEkcfHhWD1aILbl2iPDWIYIraZeVfNexar2apB7u05jlVkRru2C2N5GGXSc334qbdhQ6ywp9Vz5tEpZw5Kt2lEiS8woXTRTtO1FpYeRZlr1LmHOwfCyVmDqSHnkClc4c"},
    },{
      plugin: require('/Users/shane/master-gatsby/working/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
