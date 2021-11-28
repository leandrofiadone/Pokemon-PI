import axios from 'axios';

// UNION ENTRE BACK Y FRONT
export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons");

        //TRAE TODOS LOS POKEMONES AL HOME CON SUS TIPOS E IMAGENES
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })

        
    }
}

// ORDENA POR ORDEN ALFABETICO
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
} 