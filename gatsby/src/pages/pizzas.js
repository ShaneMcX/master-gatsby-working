import React from 'react';
import { graphql } from 'gatsby';
// import { sanityImageFixed } from '../../.cache/fragments/sanity-image-fragments';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  console.log(pageContext);
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
        price
        id
        name
        slug {
          current
        }
        toppings {
          name
        }
      }
    }
  }
`;
