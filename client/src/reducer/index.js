const initialState = {
  pokemones: [],
  allPokemons: [],
  types: [],
  detail: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS": //TRAER TODOS LOS POKEMONES
      return {
        ...state,
        pokemones: action.payload,
        allPokemons: action.payload,
        detail: []
      }

    case "GET_TYPES": //TRAE TODOS LOS TIPOS
      return {
        ...state,
        types: action.payload
      }

    // COMO CONECTA ESTE REDUCER CON LA ACTION SI NO TIENE NADA QUE DIGA POST_POKEMON LA ACTION?
    case "POST_POKEMON": //CREA NUEVO POKEMON
      return {
        ...state
      }

    case "ORDER_BY_NAME": //ORDEN ALFABETICO
      let sortedArr =
        action.payload === "asc"
          ? state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              }
              if (b.name > a.name) {
                return -1
              }
              return 0
            })
          : state.pokemones.sort(function (a, b) {
              if (a.name > b.name) {
                return -1
              }
              if (b.name > a.name) {
                return 1
              }
              return 0
            })
      return {
        ...state,
        pokemones: sortedArr
      }

    case "FILTER_CREATED": //FILTRO POR CREADOS EN API O BASE DE DATOS
      const createdFilter =
        action.payload === "created"
          ? state.allPokemons.filter((el) => el.createdInDb)
          : state.allPokemons.filter((el) => !el.createdInDb)
      return {
        ...state,
        pokemones: action.payload === "all" ? state.allPokemons : createdFilter
      }

    case "ORDER_BY_ATTACK": //ORDENA POR FUERZA DE ATAQUE
      let sortedAttack =
        action.payload === "strong"
          ? state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1
              }
              if (b.attack > a.attack) {
                return 1
              }
              return 0
            })
          : state.pokemones.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1
              }
              if (b.attack > a.attack) {
                return -1
              }
              return 0
            })
      return {
        ...state,
        pokemons: sortedAttack
      }

    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemones: action.payload
      }

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload
      }

    case "FILTER_BY_TYPE":
      const pokemonByType = state.allPokemons
      const estadoFiltrado =
        action.payload === "all"
          ? pokemonByType
          : pokemonByType.filter((e) => e.types.includes(action.payload))

      return {
        ...state,
        pokemones: estadoFiltrado
      }

    default:
      return state
  }
}

export default rootReducer
