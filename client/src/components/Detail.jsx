import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';

export default function Detail() {

    const pokemon = useSelector(state => state.data);
    
    const dispatch = useDispatch()
    const { id } = useParams();
    
    
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id])

    const myPokemon = useSelector((state) => state.detail)

    return (
        <div>
            <h1>Probando</h1>
            {
                myPokemon.length > 0 ?
                <div>
                    <h1>{myPokemon[0].name}</h1>
                    <img src= {myPokemon[0].sprite} alt='' width= '200px' height= '250px'/>
                    <h3>Types: {myPokemon[0].types.map(e => e.name + (' '))}</h3>
                    
                    <h4>Hp: {myPokemon[0].hp}</h4>
                    <h4>Attack: {myPokemon[0].attack}</h4>
                    <h4>Defense: {myPokemon[0].defense}</h4>
                    <h4>Speed: {myPokemon[0].speed}</h4>
                    <h4>Height: {myPokemon[0].height}</h4>
                    <h4>Weight: {myPokemon[0].weight}</h4>

                </div> : <p>Loading...</p>    
            }
            <p>
                <Link to= '/home' ><button>Return</button></Link>
            </p>
        </div>
    )
}