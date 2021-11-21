# jemersoft-poke-api

This is a Challenge for Jemersoft.

## There are 3 main Endpoints all working as GET requests

### There is also a fourth one to test the API via frontend using Swagger

1- Giving the default response with 20 pokemons

- http://localhost:PORT/pokemons/default
  OR -https://jemersoft-poke-api.herokuapp.com/pokemons/default

2 -Giving N pokemons passed by endpoint parameter, only integers where (0 < N <= 100)

- http://localhost:PORT/pokemons/{nPokes}
  OR -https://jemersoft-poke-api.herokuapp.com/pokemons/{nPokes}

3 -Giving a pokemon passed by endpoint parameter, could be an ID or a NAME
ID must a number and NAME insn't case sensitive, so you can type "ChaRIZArD"

4- For swagger docs

- http://localhost:PORT/poke-api-docs
  OR -https://jemersoft-poke-api.herokuapp.com/poke-api-docs

### note: the port has been set to 5000 inside index.js file
