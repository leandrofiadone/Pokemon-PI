import axios from 'axios';

// UNION ENTRE BACK Y FRONT TRAE LOS POKEMONES DE LA API
export function getPokemons(){
    return async function(dispatch){
        const pokeDex = await axios.get("http://localhost:3001/pokemons");
        //TRAE TODOS LOS POKEMONES AL HOME CON SUS TIPOS E IMAGENES
        return dispatch({
            type: 'GET_POKEMONS',
            payload: pokeDex.data
        })        
    }
}
//TRAE TODOS LOS TIPOS DE POKEMONES
export function getTypes() {
    return async function (dispatch) {
      const info = await axios.get('http://localhost:3001/types');
        return dispatch({ type: "GET_TYPES",  payload: info.data });
    };
}

//CREACION DE NUEVO POKEMON
export function postPokemon(payload) {
    return async function(dispatch){
        const responseCreated = await axios.post("http://localhost:3001/pokemons",payload)
        console.log(responseCreated)
        return responseCreated;
    }
}  




// ORDENA POR ORDEN ALFABETICO
export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
} 

//FILTRA POR CREADOS EN API O BASE DE DATOS
export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}  

//ORDENA POR FUERZA DE ATAQUE
export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

//BUSQUEDA POR NOMBRE
export function getNamePokemons(name){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/pokemons/pokemon/" + name);
                return dispatch({
                    type: "GET_NAME_POKEMONS",
                    payload: json.data
                })
        } catch(error){
            console.log(error)
        }
    }
}

//OBTENER DETALLES
export function getDetail(id) {
    return async function(dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/pokemons/"+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// export const filterType = (type) => {
//     return async (dispatch) =>
//         dispatch({ 
//             type: 'FILTER_BY_TYPE', 
//             payload: type })
// };

export function filterType(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}
  