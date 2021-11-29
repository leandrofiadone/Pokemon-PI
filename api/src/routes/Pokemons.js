const { Router } = require('express')
const { getAllPoke,  postPokedb} = require ('../Controller/pokemonController');
const {Pokemon, Type} = require('../db')


const router = Router()

// 1 TRAE TODOS LOS POKEMONES DE BASE DE DATOS Y DE API CON EL LLAMADO HTTP
router.get('/', async (req, res) => {
    try {
        const {name} = req.query;    
        if(!name) { 
            return res.status(200).send(await getAllPoke());
        }else{
            const pokeFoundName = await getPokeByName(name);
         
            if(pokeFoundName) {
                return res.status(200).json(pokeFoundName)
            }
        }
    } catch (error) {
        console.log('entro error');
        return res.status(404).send('Pokemon not found');
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const allPokemons = await getAllPoke();
    try {
        if(id) {
            const pokemonId = await allPokemons.filter(e => e.id == id);
            pokemonId.length ?
            res.status(200).json(pokemonId) :
            res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/pokemon/:name', async (req, res) => {
    const {name} = req.params;
    const allPokemons = await getAllPoke();
    try {
        if(name) {
            const pokemonName = await allPokemons.filter(e => e.name == name);
            pokemonName.length ?
            res.status(200).json(pokemonName) :
            res.status(404).send('Pokemon no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
})

//types: poke.types?.map( e=> e.type.nombre ) 
//POST METE RUTEO PARA NUEVOS POKMONES

router.post('/', async (req, res) => {
    const {nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb,
        type
    } = req.body

    let newPokemon = await Pokemon.create({
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb
    })

    let tipoDb = await Type.findAll({
        where: {
            nombre : type
        }
    })

    newPokemon.addType(tipoDb)
    res.send('El pokemon ha sido creado con éxito')
})



module.exports = router