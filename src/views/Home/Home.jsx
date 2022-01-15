import "./Home.css";
import pokeaule from "./../../assets/PokeAule.png";
import { service } from "./../../services/index";
import PokemonList from "../Components/PokemonList";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  const history = useHistory();

  const getPokemons = async () => {
    return service.list(0, 20);
  };

  const getPreviousPage = async () => {
    const previousPage = pokemons.previous;
    if (previousPage)
      service.getPage(previousPage).then((e) => setPokemons(e.data));
  };

  const getNextPage = async () => {
    const nextPage = pokemons.next;
    if (nextPage) service.getPage(nextPage).then((e) => setPokemons(e.data));
  };

  useEffect(() => {
    getPokemons().then((e) => setPokemons(e.data));
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={pokeaule} className="App-logo" alt="PokeAule logo" />
      </header>
      <div className="nav-div">
        <button
          className="nav-button"
          onClick={() => history.push("/choose-pokemon")}
        >
          Select pokemon
        </button>
      </div>
      {pokemons != null ? (
        <PokemonList
          pokemons={pokemons}
          nextPage={getNextPage}
          previousPage={getPreviousPage}
        />
      ) : (
        "Carregando"
      )}
    </div>
  );
};

export default Home;
