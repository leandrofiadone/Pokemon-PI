import React, {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import {postPokemon, getTypes} from '../actions/index'
import { useDispatch ,useSelector } from "react-redux";


export default function PokemonCreated(){

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch] );

    const [input, setInput] = useState({
        nombre: "",
        imagen: "",
        vida: "",
        fuerza: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        type: [],

    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){     
        setInput({
            ...input,
            type: [...input.type, e.target.value],
        });   
    }

    function handleSubmit(submit){
        submit.preventDefault();
        console.log(input);
        dispatch(postPokemon(input));
        alert("Pokemon creado")
        setInput({
            nombre: "",
            imagen: "",
            vida: "",
            fuerza: "",
            defensa: "",
            velocidad: "",
            altura: "",
            peso: "",
            type: [],
        })

    }



    return(
        <div>
            <Link to="/home"><button>Volver</button></Link>

            <h1>Crea tu personaje</h1>

                <form onSubmit={(e)=>handleSubmit(e)}>

                        <div>
                            <label>Nombre:</label>
                            <input
                            type="text"
                            value={input.nombre}
                            name= "nombre"
                            onChange={handleChange}/>
                            
                            <label>Vida:</label>
                            <input
                            type= "number"
                            value= {input.vida}
                            name= "vida"
                            onChange={handleChange}/>
                            </div> 

                            <label>Ataque: </label>
                            <input
                            type= "number"
                            value= {input.fuerza}
                            name= "fuerza"
                            onChange={handleChange}/>
                    
                            <label>Defensa: </label>
                            <input
                            type= "number"
                            value= {input.defensa}
                            name= "defensa"
                            onChange={handleChange}/>
                    
                            <label>Speed: </label>
                            <input
                            type= "number"
                            value= {input.velocidad}
                            name= "velocidad"
                            onChange={handleChange}/>
                
                            <label>Height: </label>
                            <input
                            type= "number"
                            value= {input.altura}
                            name= "altura"
                            onChange={handleChange}/>
                    
                            <label>Peso: </label>
                            <input
                            type= "number"
                            value= {input.peso}
                            name= "peso"
                            onChange={handleChange}/>
                    
                            <label>Imagen: </label>
                            <input
                            alt='not found' 
                            value={input.imagen} 
                            name='imagen' 
                            pattern='https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$' 
                            title='FORMATO URL'
                            placeholder='URL de imagen' 
                            onChange={handleChange}/>   

                            <select onChange={(selection) => handleSelect(selection)}>
                                {types.map((typ)=>(
                                    <option value={typ.nombre}>
                                        {typ.nombre}
                                    </option>
                                ))}
                                </select>    
                            
                            <ul><li>{input.type.map(seleccionado => seleccionado)}</li></ul>        

                            <button type="submit">Crear Personaje</button>
                </form>

        </div>
    )
}
