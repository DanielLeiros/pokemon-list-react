import "./PokemonList.css";
import Tile from "./Tile.jsx";

const PokemonList = (props) => {
  const pokemonsList = props.pokemons.results;
  const tableNavigationButtons = (
    <TableNavigationButtons
      previousPage={() => props.previousPage()}
      nextPage={() => props.nextPage()}
    />
  );

  return (
    <div>
      {tableNavigationButtons}
      <div className="pokemon-list">
        {pokemonsList.map((pokemon, key) => (
          <Tile key={key} pokemon={pokemon} />
        ))}
      </div>
      {tableNavigationButtons}
    </div>
  );
};

const TableNavigationButtons = (props) => {
  return (
    <div className="table-navigation-buttons">
      <button className="list-button" onClick={() => props.previousPage()}>
        <div className="text-button">{"< Previous"}</div>
      </button>

      <button className="list-button" onClick={() => props.nextPage()}>
        <div className="text-button">{"Next >"}</div>
      </button>
    </div>
  );
};

export default PokemonList;
