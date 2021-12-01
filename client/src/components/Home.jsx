import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName, filterCreated, orderByAttack, getTypes, filterType } from '../actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch()
    const tuttiPokemons = useSelector((state)=> state.pokemones)
    const types = useSelector((state)=> state.types)
    
    //declara constante y trae todo lo que esta en el estado de pokemones, el pokemones del final viene del reducer
    

    //PAGINADO....
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage, setPokemonPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; 
    const currentPokemons = tuttiPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) }
    //PAGINADO.....

    const [orden, setOrden] = useState('')

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
        }


    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
        },[dispatch])

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }    

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }

    function handleSortAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterType(e.target.value));
        setCurrentPage(1);
        setOrden(` ${e.target.value}`);
      }

  

    return (
        <div>
            <Link to= '/pokemon'>Crear Personaje</Link>
            <h1>Aguante Pokemons</h1>
            <button onClick={e => {handleClick(e)}}>
                        Volver a cargar Pokemones
            </button>
            <div>
                <select onChange={e=> handleSort(e)}>
                    <option value = 'asc'>Ascending order</option>
                    <option value = 'desc'>Descending order</option>
                </select>

                <select onChange={e => {handleSortAttack(e)}}>
                    <option value = 'strong'>Stronger attack</option>
                    <option value = 'weak'>Weaker attack</option>
                </select>

                <select onChange={(e) => {handleFilterType(e);}}>
                {types?.map((e) => (
                <option value={e.nombre}>{e.nombre}</option>))}
                </select>


                <select onChange={e=> handleFilterCreated(e)}>
                <option value="all">Show all...</option>
                <option value="api">Reals</option>
                <option value="created">Created</option>
                </select>
            </div>
            <div >        
                <Paginado
                pokemonPerPage = {pokemonPerPage}
                tuttiPokemons={tuttiPokemons.length}
                paginado = {paginado}
                />
            </div>    
            
            <SearchBar/>

            <div>

             {currentPokemons.map((ob) => {
                 return(
                        
                    <Link to ={`/pokemons/${ob.id}`}>
                                <Card 
                                name={ob.name}
                                sprite={ob.sprite}
                                types={ob.types}
                                key={ob.id}/>
                    </Link>
                            
                        )
                })}
                    
                
            </div>

            <div >        
                <Paginado
                pokemonPerPage = {pokemonPerPage}
                tuttiPokemons={tuttiPokemons.length}
                paginado = {paginado}
                />
            </div>

        </div>

        
    )
}