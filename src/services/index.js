import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/'
});

const list = (offset=0, limit=20) => {
  return api
    .get(
      `?limit=${limit}&offset=${offset}`,
    );
}

const getPage = (url) => {
  const page = axios.create({baseURL: url});
  return page
    .get();
}

const getPokemon = (url) => {
  const pokemonPage = axios.create({baseURL: url});
  return pokemonPage.get();
}

const getPokemonById = (id) => {
  return api.get(`${id}`);
}

export const service = {
  list,
  getPage,
  getPokemon,
  getPokemonById
}
