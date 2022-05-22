import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';
import styles from './SearchBar.module.css';


export default function SearchBar(){

    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        
        console.log(name)
    }

    function handleSubmit(e){
        
        e.preventDefault()
        dispatch(getNamePokemons(name))
        
    }    

    return(
        
            <form onSubmit={e => handleSubmit(e)}>
        <input className={styles.searchinput} type='text' placeholder='Pokemon´s name...'
        onChange={e => handleInputChange(e)}></input>
        <button className={styles.searchbtn} type='button' onClick={e => handleSubmit(e)}>Search</button>
            </form>
    
    )
}