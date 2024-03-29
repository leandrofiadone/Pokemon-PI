import axios from "axios"

// UNION ENTRE BACK Y FRONT TRAE LOS POKEMONES DE LA API
export function getPokemons() {
  return async function (dispatch) {
    const pokeDex = await axios.get("/pokemons")
    //TRAE TODOS LOS POKEMONES AL HOME CON SUS TIPOS E IMAGENES
    return dispatch({
      type: "GET_POKEMONS",
      payload: pokeDex.data
    })
  }
}
//TRAE TODOS LOS TIPOS DE POKEMONES
export function getTypes() {
  return async function (dispatch) {
    const info = await axios.get("/types")
    return dispatch({type: "GET_TYPES", payload: info.data})
  }
}

//CREACION DE NUEVO POKEMON
export function postPokemon(payload) {
  return async function (dispatch) {
    const responseCreated = await axios.post("/pokemons", payload)

    return responseCreated
  }
}

// ORDENA POR ORDEN ALFABETICO
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload
  }
}

//FILTRA POR CREADOS EN API O BASE DE DATOS
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload
  }
}

//ORDENA POR FUERZA DE ATAQUE
export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload
  }
}

//BUSQUEDA POR NOMBRE
export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get("/pokemons/pokemon/" + name)
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//OBTENER DETALLES
export function getDetail(id) {
  //POR PROMISE
  // return function(dispatch) {
  // axios.get("http://localhost:3001/pokemons/"+id)
  // .then(res =>{
  //     dispatch({
  //         type: 'GET_DETAILS',
  //       payload: res.data
  //     })
  // })

  //POR ASYNC/ AWAIT
  return async function (dispatch) {
    try {
      let json = await axios.get("/pokemons/" + id)
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function filterType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload
  }
}
