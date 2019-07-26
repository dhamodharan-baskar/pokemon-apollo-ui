import React from "react";
import PokemonTypeList from "./PokemonTypeList";
import { Menu } from "semantic-ui-react";

function App() {
  return (
    <div>
      <Menu stackable>
        <Menu.Item>
          <h3>Pokemon World</h3>
        </Menu.Item>
      </Menu>
      <PokemonTypeList />
    </div>
  );
}

export default App;
