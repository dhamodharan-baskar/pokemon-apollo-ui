import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Tab } from "semantic-ui-react";
import PokemonList from "./PokemonList";

const GET_POKEMMON_TYPES = gql`
  {
    pokemonTypes {
      id
      name
    }
  }
`;

const PokemonTypes = () => (
  <Query query={GET_POKEMMON_TYPES}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      const panes = data.pokemonTypes.map(pokemonType => ({
        menuItem: pokemonType.name,
        render: () => (
          <Tab.Pane>
            <PokemonList pokemonTypeId={pokemonType.id} />
          </Tab.Pane>
        )
      }));
      return (
        <Tab
          menu={{ fluid: true, vertical: true, tabular: "right" }}
          panes={panes}
        />
      );
    }}
  </Query>
);

export default PokemonTypes;
