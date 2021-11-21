# jemersoft-poke-api

This is a Challenge for Jemersoft.

## There are 3 main Endpoints all working as GET requests.

Giving the default response with 20 pokemons

- http://localhost:PORT/pokemons/default

Giving N pokemons passed by endpoint parameter, only integers where (0 < N <= 100)

- http://localhost:PORT/pokemons/{nPokes}

Giving a pokemon passed by endpoint parameter, could be an ID or a NAME
ID must a number and NAME insn't case sensitive, so you can type "ChaRIZArD"

- http://localhost:PORT/pokemons/{idOrName}

### note: the port has been set to 5000 inside index.js file
