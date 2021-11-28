const initialState = {
    pokemones : [],
    allPokemons: [],

}

function rootReducer (state = initialState, action){

    switch(action.type){
        
        case 'GET_POKEMONS':
                return{
                    ...state,
                    pokemones: action.payload,
                    allPokemons: action.payload
                }   

        case 'ORDER_BY_NAME':
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
                            pokemones: sortedArr
                        }
    

    default: return state;   
    
} 

}

export default rootReducer;