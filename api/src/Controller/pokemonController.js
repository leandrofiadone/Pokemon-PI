const axios = require('axios');  
const { Pokemon, Type } = require('../db');
const { API_POKEMON, API_POKEMON_NAME_OR_ID } = require('../utils/Globales');


// 1 TRAE TODOS LOS OBJETOS DE LA API DE A 40
const getPokeapi = async () => {
    try {
        const pokemonsRequest = await axios.get(API_POKEMON);  
        //me devuelve los 40 objetitos con un name y una url de cada pokemon
        const pokemonsSubrequest = pokemonsRequest.data.results.map(obj => axios.get(obj.url));      
        //hago el axios pero a la sub url TERMINAR DE VER COMO FUNCIONA EL data.results.map
        const infoUrlPokemons = await axios.all(pokemonsSubrequest);  
        //solicitudes simultaneas 

        let pokemons = infoUrlPokemons.map(obj => obj.data);  
        //obtengo la data de cada pokemon por su suburl

        let infoPokemons = pokemons.map(pokemon => objPokeApi(pokemon))
        return infoPokemons

    } catch (error) {
        console.log(error);
        return error;
    }
};

const objPokeApi = (poke) => {
    
    const objPokeapi =
    {
        id: poke.id,
        name: poke.name,
        life: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        speed: poke.stats[5].base_stat,
        height: poke.height,
        weight: poke.weight,
        sprite: poke.sprites.other.dream_world.front_default,
        types: poke.types.length < 2 ? [ poke.types[0].type.name] : [poke.types[0].type.name," ", poke.types[1].type.name],
    };
    return objPokeapi
};




// 2 TRAE LOS POKEMONES DE LA BASE DE DATOS
const getPokedb = async () => {

    const pokemonDb = await Pokemon.findAll({ include: Type });

    const objPokeapi = pokemonDb.map(pokemonDb => { 
        return{
        id: pokemonDb.dataValues.id,
        name: pokemonDb.dataValues.nombre,
        life: pokemonDb.dataValues.vida,
        attack: pokemonDb.dataValues.fuerza,
        defense: pokemonDb.dataValues.defensa,
        speed: pokemonDb.dataValues.velocidad,
        height: pokemonDb.dataValues.altura,
        weight: pokemonDb.dataValues.peso,
        sprite: pokemonDb.dataValues.imagen,
        types: pokemonDb.dataValues.types?.map( e=> e.nombre+" " ), 
        createdInDb: pokemonDb.dataValues.createdInDb
    };
})

    try {
        return objPokeapi
    } catch (err) {
        console.log(err);
    }
}


// 3 UNION DE TODOS LOS POKEMONES DE API Y BASE DE DATOS
//me permite unir el array que me devuelve la pokeapi (40) pokemons + los pokemons creados en la DB pokemons
const getAllPoke = async () => {
    try {
        const apiPokeData = await getPokeapi();
        const dbPokeData = await getPokedb();
        // console.log(dbPokeData)
        return [...apiPokeData, ...dbPokeData];

    } catch (error) {
        console.log(error);
        return error;
    }
};


module.exports = {
    getPokeapi,
    getPokedb,
    getAllPoke,
}