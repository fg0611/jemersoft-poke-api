const axios = require("axios");
require("dotenv").config();
const URL = process.env.URL;

const getHome = async (req, res, next) => {
  try {
    return res.json({
      Title: "Jemersoft test/challenge",
      Techs: "javascript, node, express, swagger & others",
      SwaggerDocs: "https://jemersoft-poke-api.herokuapp.com/poke-api-docs",
    });
  } catch (error) {
    next(error);
  }
};

// get 20 pokes by default
const getDefault = async (req, res, next) => {
  try {
    console.log(URL);
    const { data } = await axios.get(URL);
    return res.json(data.results);
  } catch (error) {
    next(error);
  }
};

// get any Given number of pokes by params
const getNpokes = async (req, res, next) => {
  let pokeList = [];
  let page = URL;

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
    let ID = parseInt(idOrName) > 0 ? idOrName : null;
    let NAME = ID == null ? idOrName.toLowerCase() : null;

    const { data } = await axios.get(`${URL}${ID || NAME}`);
    const {
      name,
      type,
      weight,
      types,
      abilities,
      moves,
      sprites,
      description,
    } = data;

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
      description,
    };
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHome,
  getDefault,
  getNpokes,
  getByIdOrName,
};
