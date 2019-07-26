import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Grid, Card, Image, Modal, List } from "semantic-ui-react";

const GET_POKEMONS = gql`
  query Pokemons($pokemonTypeId: ID!) {
    pokemons(pokemonTypeId: $pokemonTypeId) {
      id
      name
      image
      type {
        name
      }
      base {
        HP
        Attack
        Defense
        SpecialAttack
        SpecialDefense
        Speed
      }
    }
  }
`;

function getShortDetail(pokemon) {
  return (
    <Grid.Column key={pokemon.id}>
      <Card>
        <Image src={pokemon.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{pokemon.name}</Card.Header>
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}
const Pokemons = ({ pokemonTypeId }) => (
  <Query query={GET_POKEMONS} variables={{ pokemonTypeId }}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      return (
        <Grid columns={6} divided>
          {data.pokemons.map(pokemon => (
            <Modal
              key={pokemon.id}
              trigger={getShortDetail(pokemon)}
              size="tiny"
            >
              <Modal.Header>{pokemon.name}</Modal.Header>
              <Modal.Content image>
                <Image wrapped size="medium" src={pokemon.image} />
                <Modal.Description>
                  <h3>Type</h3>
                  <List>
                    {pokemon.type.map(type => (
                      <List.Item>{type.name}</List.Item>
                    ))}
                  </List>
                  <h3>Base</h3>
                  <List>
                    <List.Item>HP: {pokemon.base.HP}</List.Item>
                    <List.Item>Attack: {pokemon.base.Attack}</List.Item>
                    <List.Item>Defense: {pokemon.base.Defense}</List.Item>
                    <List.Item>
                      SpecialAttack: {pokemon.base.SpecialAttack}
                    </List.Item>
                    <List.Item>
                      SpecialDefense: {pokemon.base.SpecialDefense}
                    </List.Item>
                    <List.Item>Speed: {pokemon.base.Speed}</List.Item>
                  </List>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default Pokemons;
