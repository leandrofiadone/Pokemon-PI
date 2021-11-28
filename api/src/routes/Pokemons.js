const { Router } = require('express')
const { getAllPoke,  postPokedb} = require ('../Controller/pokemonController');


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

//types: poke.types?.map( e=> e.type.nombre ) 
//POST METE RUTEO PARA NUEVOS POKMONES

router.post('/', async (req, res) => {
    try {
        const pokeData = req.body
        // console.log('holaaaaa', pokeData)
        await postPokedb(pokeData)
        return res.status(200).send('Pokemon creado con exito')

    } catch (error) {
        res.status(400).send('Fallo al crear el pokemon')
    }
});


  


module.exports = router