import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, orderByName } from '../actions';
import {Link} from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home(){
    const dispatch = useDispatch()
    const tuttiPokemons = useSelector((state)=> state.pokemones)
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
        },[dispatch])

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }    

    return (
        <div>
            <Link to= '/pokemon'>Crear Personaje</Link>
            <h1>Aguante Pokemons</h1>
            <button onClick={e => {handleClick(e)}}>
                        Volver a cargar Pokemones
            </button>

                <select onChange={e=> handleSort(e)}>
                    <option value = 'asc'>Ascending order</option>
                    <option value = 'desc'>Descending order</option>
                </select>

                <select>
                    <option value = 'strong'>Stronger attack</option>
                    <option value = 'weak'>Weaker attack</option>
                </select>

                <select>
                    <option value="default" disabled>Filter by type</option>
                </select>


                <select>
                <option value="All">Show all...</option>
                <option value="api">Reals</option>
                <option value="created">Created</option>
                </select>

            <div >        
                <Paginado
                pokemonPerPage = {pokemonPerPage}
                tuttiPokemons={tuttiPokemons.length}
                paginado = {paginado}
                />
            </div>    
            
            <div>

             {currentPokemons.map((ob) => {
                 return(
                        
                    <Link to ={`/pokemons/${ob.id}`}>
                                <Card 
                                name={ob.name}
                                sprite={ob.sprite}
                                tipo={ob.tipo}
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