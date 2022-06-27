const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRoutes = require("./Pokemons.js");
const typesRoutes = require("./Types.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----- Routes Config -----
router.use("/pokemons", pokemonsRoutes);
router.use("/types", typesRoutes);

module.exports = router;


