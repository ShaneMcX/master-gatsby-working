/* eslint-disable react/jsx-props-no-spreading */

import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a Template
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Get the Pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  // 3. Loop and create
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // todo: regex for topping.
      },
    });
  });
}

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a Template
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Get the Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop and create
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  console.log('======= Turn Beers Into Nodes!!!');
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  console.log('======= fetch complete');
  const beers = await res.json();
  console.log('======= json complete');

  // const nodes = beers.map((beer) => )
  for (const beer of beers) {
    if (beer.name && beer.rating.average) {
      const nodeMeta = {
        // API has changed, so could use the ID from the API
        id: createNodeId(`beer-${beer.name}`),
        parent: null,
        children: [],
        internal: {
          type: 'Beer',
          mediaType: 'application/json',
          contentDigest: createContentDigest(beer),
        },
      };
      actions.createNode({
        ...beer,
        ...nodeMeta,
      });
    }
  }
}

export async function sourceNodes(params) {
  await Promise.all[fetchBeersAndTurnIntoNodes(params)];
}

export async function createPages(params) {
  // create pages dynamically

  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);

  // People
}
