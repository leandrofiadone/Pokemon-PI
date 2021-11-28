const axios = require('axios');
const { Type } = require('../db');
const { API_POKEMON_TYPE } = require('../utils/Globales');

//Add pokemon types to database automatically when server is up
const addTypeDb = async () => {
    try {
        const reqType = await axios.get(API_POKEMON_TYPE)
        const resType = reqType.data.results
        
        resType.map(e => {
            Type.create({ nombre: e.name })
            /* console.log({name: e.name}) */
        })
    } catch (err) {
        console.log(err)
    }
}
addTypeDb()

//I bring the types from my database and send them to the router
const getTypeApi = async () => {
    const result = await Type.findAll();
    return result;
}



module.exports = { getTypeApi}; 