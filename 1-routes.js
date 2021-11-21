const { Router } = require("express");
const router = Router();
const controllers = require("./2-controllers");

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Get 20 Pokes by Default
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: The Pokemons Descriptions having Name and Image
 *         contens:
 *           application/json
 *       404:
 *         description: Not Found
 *
 */
router.get("/pokemons/default", controllers.getDefault); // first 20 pokemons with no Atts

/**
 * @swagger
 * /pokemons/{nPokes}:
 *   get:
 *     summary: Get pokemons by a given NUMBER
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: nPokes
 *         schema:
 *           type: string
 *         required: true
 *         description: Nº of Pokemons
 *     responses:
 *       200:
 *         description: The Pokemons Descriptions having Name, Atts, Abilities and Image
 *         contens:
 *           application/json
 *       404:
 *         description: Not Found
 */

router.get("/pokemons/:nPokes", controllers.getNpokes); // get N_pokemons passed by params

/**
 * @swagger
 * /pokemon/{idOrName}:
 *   get:
 *     summary: Get pokemons by a Given ID or NAME
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: idOrName
 *         schema:
 *           type: string
 *         required: true
 *         description: Pokemon by Id or Name
 *     responses:
 *       200:
 *         description: The Pokemon Description having Name, Atts, Abilities, Moves and Image
 *         contens:
 *           application/json
 *       404:
 *         description: Not Found
 */

router.get("/pokemon/:idOrName", controllers.getByIdOrName); // get any pokemon by id or name

module.exports = router;
