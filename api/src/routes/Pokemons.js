const {Router} = require('express')
const {getAllPoke} = require('../Controller/pokemonController');
const { Pokemon, Type} = require('../db')

const router = Router()

// 1 TRAE TODOS LOS POKEMONES DE BASE DE DATOS Y DE API CON EL LLAMADO HTTP
//UTILIZANDO LA FUNCION getAllPoke traída de pokemonController

router.get('/', async (req, res) => {
    try {

        return res.status(200).send(await getAllPoke());

    } catch (error) {
        console.log('entro error');
        return res.status(404).send('Pokemons not found');
    }
});

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS ID

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (id) {
            const pokemonId = await allPokemons.filter(e => e.id == id);
            pokemonId.length ?
                res.status(200).json(pokemonId) :
                res.status(404).send('Pokemon not found')
        }
    } catch (error) {
        console.log(error);
    }
})

//BUSCA LOS POKEMONS POR SUS ID PRIMERO LLAMANDO A LA FUNCION getAllPoke
//LUEGO FILTRA EL OBJETO CREADO A PARTIR DE LA FUNCION POR SUS NAME

router.get('/pokemon/:name', async (req, res) => {
    const { name } = req.params;
    const allPokemons = await getAllPoke();
    try {
        if (name) {
            const pokemonName = await allPokemons.filter(e => e.name == name);
            pokemonName.length ?
                res.status(200).json(pokemonName) :
                res.status(404).send('Pokemon no encontrado')
        }
    } catch (error) {
        console.log(error);
    }
})

//POSTEO DE NUEVOS POKEMONES EN LA BASE DE DATOS

router.post('/', async (req, res) => {
    const {
        nombre,
        vida,
        fuerza,
        defensa,
        velocidad,
        altura,
        peso,
        imagen,
        createdInDb,
        type
    } = req.body //indica los parametros pertenecientes al body en el JSON

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
    }) //creador del nuevo Pokemon en la base de datos

    let tipoDb = await Type.findAll({
        where: {
            nombre: type
        }
    }) //busca todos los tipos de pokemones en la base de datos

    newPokemon.addType(tipoDb)
    res.send('El pokemon ha sido creado con éxito')
})// agrega el tipo al nuevo pokemon



module.exports = router