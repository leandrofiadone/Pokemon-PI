const axios = require('axios');
const {Type} = require('../db');
const {API_POKEMON_TYPE} = require('../utils/Globales');

// 1 - ADHIERE LOS TYPES A LA BASE DE DATOS CUANDO EL SERVIDOR ESTA ANDANDO
const addTypeDb = async () => {
    try {
        const reqType = await axios.get(API_POKEMON_TYPE) //llamado a la api
        const resType = reqType.data.results

        resType.map(e => {
            Type.create({
                nombre: e.name
            })
            /* console.log({name: e.name}) */
        })
    } catch (err) {
        console.log(err)
    }
}
addTypeDb()


// 2 - LOS TYPES SON TRAIDOS DE LA BASE DE DATOS Y ENVIADOS AL ROUTER
const getTypeApi = async () => {
    const result = await Type.findAll();
    return result;
}

module.exports = {
    getTypeApi
};