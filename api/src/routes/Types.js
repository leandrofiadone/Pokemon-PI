
const { Router } = require('express');
const { getTypeApi } = require('../Controller/typeController');
const axios = require('axios');


const router = Router()

router.get('/', async (req, res) => {
    const resultType = await getTypeApi()
    res.json(resultType)
})

module.exports = router;

// const { Router } = require('express');
// const axios = require('axios');
// const { Type } = require('../db');

// const router = Router();

// router.get('/', async (req, res) => {
//     const typeNormal = await Type.findOne({where: {nombre:'normal'}});
  
//     if(!typeNormal) {
//         try {
//             const types = await axios.get("https://pokeapi.co/api/v2/type");
//             const typesTotal = types.data.results.map(e => e.name);
//             const typesCreate = typesTotal.map(async e => await Type.create({ nombre: e }));
//             res.status(200).send(typesTotal);
//         } catch (error) {
//             res.status(404).send('error');
//         };
//     } else {
//         const types = await Type.findAll();
//         const typesTotal = types.map(e => e.nombre);
//         return res.status(200).send(typesTotal);
//     };
// })

// module.exports = router;
