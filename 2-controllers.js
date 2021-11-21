const axios = require("axios");

// get 20 pokes by default
const getDefault = async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    return res.json(data.results);
  } catch (error) {
    next(error);
  }
};

// get any Given number of pokes by params
const getNpokes = async (req, res, next) => {
  let pokeList = [];
  let page = "https://pokeapi.co/api/v2/pokemon/";

  try {
    const n = req.params?.nPokes;
    if (
      typeof parseInt(n) === "number" &&
      parseInt(n) > 0 &&
      parseInt(n) <= 100
    ) {
      console.log("Info: ", parseInt(n));
      while (pokeList.length < req.params.nPokes) {
        const resp = await axios.get(`${page}`);
        page = resp.data.next; //saves 20 more pokes
        let results = resp.data.results;
        Promise.all(
          results.map(async (pokemon) => {
            const info = await axios.get(pokemon.url);
            let { id, name, sprites, types, abilities } = info.data;
            let poke = {
              id,
              name,
              img: sprites.front_default,
              type: types.map((a) => {
                return a.type.name;
              }),
              abilities: abilities.map((a) => {
                return a.ability.name;
              }),
            };
            return poke;
          })
        ).then((data) => {
          pokeList = pokeList.concat(data);
        });
      }
      return res.json(pokeList.slice(0, n));
    } else {
      return res.json({
        msg: "You need to Pass a Valid Number by Params higher than 0 and lower than 101",
      });
    }
  } catch (error) {
    next(error);
  }
};

// get poke by id or name
const getByIdOrName = async (req, res, next) => {
  try {
    const { idOrName } = req.params;
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${idOrName}`
    );
    const { name, type, weight, types, abilities, moves, sprites } = data;

    const result = {
      name,
      type,
      weight,
      type: types.map((t) => {
        return t.type.name;
      }),
      abilities: abilities.map((a) => {
        return a.ability.name;
      }),
      moves: moves.map((a) => {
        return a.move.name;
      }),
      img: sprites.front_default,
    };
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDefault,
  getNpokes,
  getByIdOrName,
};
