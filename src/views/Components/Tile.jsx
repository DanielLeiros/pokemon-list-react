import { useState, useEffect } from "react";
import { service } from "./../../services/index";
import "./Tile.css";

const Tile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    setIsLoading(true);
    service.getPokemon(props.pokemon.url).then((e) => {
      setPokemonData(e);
      setIsLoading(false);
    });
  }, [props.pokemon]);

  return (
    <div className="pokemon-tile">
      <div className="tile-title">{props.pokemon.name}</div>
      {!isLoading ? <PokemonInfo pokemon={pokemonData} /> : "Loading..."}
    </div>
  );
};

const PokemonInfo = (props) => {
  const pokemon = props.pokemon.data;
  const { name, height, weight, sprites, abilities } = pokemon;

  const formatAbilities = () => {
    const abilitiesList = abilities.map((e) => e.ability.name);
    return abilitiesList.join(", ");
  };

  formatAbilities();
  return (
    <div className="info-data">
      <ul>
        <li>
          <strong>Height:</strong> {height}
        </li>
        <li>
          <strong>Weight:</strong> {weight}
        </li>
        <li>
          <strong>Abilities:</strong> {formatAbilities()}
        </li>
      </ul>
      <img src={sprites.front_default} alt={`Frontal imagem of ${name}`} />
    </div>
  );
};

export default Tile;
