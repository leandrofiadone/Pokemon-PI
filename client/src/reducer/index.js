const initialState = {
    pokemones : [],
    allPokemons: [],
    types: [],
    detail: [],

}

function rootReducer (state = initialState, action){

    switch(action.type){
        
        case 'GET_POKEMONS': //TRAER TODOS LOS POKEMONES
                return{
                    ...state,
                    pokemones: action.payload,
                    allPokemons: action.payload}
                    
        case "GET_TYPES": //TRAE TODOS LOS TIPOS
                return {
                    ...state,
                    types: action.payload,
                };
            
        case "POST_POKEMON": //CREA NUEVO POKEMON
                return{
                    ...state,
                };  

        case 'ORDER_BY_NAME': //ORDEN ALFABETICO
            let sortedArr = action.payload === 'asc' ?
            state.pokemones.sort(function (a,b){
            if (a.name > b.name){
                return 1;}
            if (b.name > a.name){
                return -1;}
                return 0;
            }) : 
            state.pokemones.sort(function (a,b){
            if (a.name > b.name){
                return -1;}
            if (b.name > a.name){
                return 1;}
                return 0; 
            })
                return{
                    ...state, 
                    pokemones: sortedArr}

           
            
        case 'FILTER_CREATED': //FILTRO POR CREADOS EN API O BASE DE DATOS
        
                const createdFilter = 
                action.payload === 'created' 
                ? state.allPokemons.filter( el => el.createdInDb) 
                : state.allPokemons.filter( el => !el.createdInDb) 
                return {
                    ...state,
                    pokemones: action.payload === 'all' ? 
                    state.allPokemons : createdFilter}   

                    
        case 'ORDER_BY_ATTACK': //ORDENA POR FUERZA DE ATAQUE
            let sortedAttack = action.payload === 'strong' ?
            state.pokemones.sort(function (a, b) {
            if(a.attack > b.attack) {
                return -1;}
            if(b.attack > a.attack) {
                return 1;}
            return 0;
            }) :
            state.pokemones.sort(function (a, b) {
            if(a.attack > b.attack) {
                return 1;}
            if(b.attack > a.attack) {
                return -1;}
            return 0;
            })
            return {
                ...state,
                pokemons: sortedAttack
            }

        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemones: action.payload
            }

        case 'GET_DETAILS':
            return {
            ...state,
            detail: action.payload
            }

        // case 'FILTER_BY_TYPE':
        //     console.log(action.payload)
        //     return{
        //         ...state,
                
		// 		pokemonsFilter: state.allPokemons.filter(poke => poke.type.map(type => type.nombre)[0] === action.payload || poke.type.map(type => type.nombre)[1] === action.payload)
                
        //     }
        // case 'FILTER_BY_TYPE':
            
        //     const allPokemons = state.allPokemons
        //     const typeFiltered = action.payload === 'all' ? allPokemons : allPokemons.filter(e => e.types.map(e => e.nombre)[0] === action.payload || e.types.map(e => e.nombre)[1] === action.payload)
        //     return {
        //         ...state,
        //         pokemons: typeFiltered
        //     }
        
        case 'FILTER_BY_TYPE':

            
            const allPokemons2 = state.allPokemons
            const statusFilter2 =
            action.payload === "all"
            ? allPokemons2
            : allPokemons2.filter((e)=>e.types.includes(action.payload))
            console.log(statusFilter2);
            return {
                ...state,
                pokemones: statusFilter2,
            } 
          


    default: return state;   
    
} 

}

export default rootReducer;