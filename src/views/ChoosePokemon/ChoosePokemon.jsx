import "./ChoosePokemon.css";
import { service } from "./../../services/index";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

const ChoosePokemon = () => {
  const history = useHistory();

  const dragItem = useRef();
  const isInDropArea = useRef(false);

  const pokemonsIdList = [1, 4, 7];
  const [pokemons, setPokemons] = useState();
  const [selectedPokemon, setSelectedPokemon] = useState();

  const getPokemons = async () => {
    const pokemonList = [];
    for (const id in pokemonsIdList) {
      let pokemon = await service.getPokemonById(pokemonsIdList[id]);
      pokemonList.push(pokemon);
    }
    return pokemonList;
  };

  const dragStart = (e) => {
    dragItem.current = e;
  };

  const drop = (e) => {
    if (isInDropArea.current) setSelectedPokemon([dragItem.current]);
    isInDropArea.current = false;
  };

  const dropAreaEnter = (e) => {
    isInDropArea.current = true;
  };

  const clearSelection = () => {
    setSelectedPokemon([]);
  };

  useEffect(() => {
    getPokemons().then((e) => {
      setPokemons(e);
    });
  });

  return (
    <div className="Choose-pokemon">
      <button className="nav-button" onClick={() => history.push("/")}>
        Back to pokemon List
      </button>
      <div className="selection-area">
        <div className="area pick-area">
          <div>Pickup your pokemon</div>
          {pokemons
            ? pokemons.map((pokemon) => (
                <div
                  className={"draggable-pokemon"}
                  key={pokemon.data.name}
                  draggable
                  onDragStart={(e) => dragStart(pokemon)}
                  onDragEnd={(e) => drop()}
                >
                  <Pokemon
                    img={pokemon.data.sprites.front_default}
                    name={pokemon.data.name}
                  />
                </div>
              ))
            : null}
        </div>
        <div
          className="area drop-area"
          onDragEnter={(e) => {
            dropAreaEnter();
          }}
          draggable
        >
          <div>
            Drop your pokemon here!
            {selectedPokemon && selectedPokemon.length > 0 ? (
              <button
                className="clear-selection-button"
                onClick={() => clearSelection()}
              >
                [clear]
              </button>
            ) : null}
          </div>
          {selectedPokemon
            ? selectedPokemon.map((e) => (
                <div
                  key={e.data.name}
                  className="selected-pokemon"
                  onDoubleClick={() => clearSelection()}
                >
                  <Pokemon
                    img={e.data.sprites.front_default}
                    name={e.data.name}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

const Pokemon = (props) => {
  return <img src={props.img} alt={props.name} />;
};

export default ChoosePokemon;
