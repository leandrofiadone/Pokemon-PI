import React, {useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import {postPokemon, getTypes} from '../actions/index'
import { useDispatch ,useSelector } from "react-redux";



function validation(input){
    let errors={}
    if(parseInt(input.max_Height) <= parseInt(input.min_Height)){ 
        errors.max_Height='La altura minima no debe ser mayor o igual a la altura máxima';   
    }else if (parseInt(input.max_Weight) <= parseInt(input.min_Weight)){  
        errors.max_Weight='El peso minimo no debe ser mayor al peso máximo';   
    }else if (parseInt(input.max_Year) <= parseInt(input.min_Year)){ 
        errors.max_Year='La edad minima no debe ser mayor a la edad máxima';   
    }
    return errors;
}


export default function DogCreated(){
    const dispatch = useDispatch()
    //const history = useHistory();
    const [errors, setErrors] = useState({});
    const temperaments = useSelector((state) => state.temperaments)

    const [input, setInput] = useState({
        nombre:'',
        // min_Height:'',
        // max_Height:'',
        // min_Weight:'',
        // max_Weight:'',
        // min_Year:'',
        // max_Year:'', 
        // image:'',
        // temperament: [] 
     });

     function handleChange(e){
         setInput({
             ...input,
             [e.target.nombre] : e.target.value
         })
         console.log(input)

         setErrors(validation({
            ...input, [e.target.nombre] : e.target.value
        }));
     }


     function handleSelect(e){     
        setInput({
            ...input,
            temperament: [...input.temperament, + e.target.value],
        });   
    }

    function handleDelete(e){
        setInput({
            ...input, 
            temperament: input.temperament.filter(t=> t !== e)
        })
    }


    function handleSubmit(e){  
        e.preventDefault();
        if (errors.max_Year !== undefined || errors.max_Height !== undefined || errors.max_Weight !== undefined){
            document.getElementById('form').reset();
            return alert('No se puede crear la raza porque el formulario contiene errores');
        }

        const sendPokemon={
            name: input.nombre,
            // height: input.min_Height + '-' + input.max_Height,
            // weight: input.min_Weight + '-' + input.max_Weight,
            // year: input.min_Year + '-' + input.max_Year + ' years', 
            // image: input.image,
            // temperament: input.temperament 
        }

        dispatch(postPokemon(sendPokemon));
        alert("Pokemon Creado");

        setInput({
            nombre:'',
            // min_Height:'',
            // max_Height:'',

            // min_Weight:'',
            // max_Weight:'',

            // min_Year:'',
            // max_Year:'',

            // image:'',
            // temperament: []
        })

        // history.push('/home')
    
    }

    useEffect(()=> {
        dispatch(getTypes())
    },[dispatch]);


    return(
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu personaje</h1>

            <form id='form' name='form' onSubmit ={(e) => handleSubmit(e)}>
                <div>
                    
                    <label>Nombre:</label>
                    <input
                    type='text'
                    value={input.name}
                    name="name"
                    onChange={(e)=>handleChange(e)} 
                    />

                </div>

                {/* <div className="label"> 
                    <label>Altura: </label>
                    <input type='number' 
                    value={input.min_Height} 
                    name='min_Height' 
                    min='10' 
                    max='80' 
                    placeholder='Menor altura' 
                    onChange={(e)=>handleChange(e)} 
                    required/>cm 
                    
                    
                    <input type='number' 
                    value={input.max_Height} 
                    name='max_Height' 
                    min='15' 
                    max='100' 
                    placeholder='Mayor altura' 
                    onChange={(e)=>handleChange(e)} 
                    required/>cm 
                    {errors.max_Height && (<p>{errors.max_Height}</p>)}   
                                    
                </div>

                <div className="label">
                    <label>Peso: </label>
                    <input type='number' 
                    value={input.min_Weight} 
                    name='min_Weight' 
                    min='1' 
                    max='90' 
                    placeholder='Menor peso' 
                    onChange={(e)=>handleChange(e)} 
                    required/>Kg 

                    <input type='number' 
                    value={input.max_Weight} 
                    name='max_Weight' 
                    min='2' max='100' 
                    placeholder='Mayor peso' 
                    onChange={(e)=>handleChange(e)} 
                    required/>Kg    
                    {errors.max_Weight && (<p>{errors.max_Weight}</p>)}   

                </div>

                <div className="label">
                    <label>Espectativa de vida: </label>
                    <input type='number' 
                    value={input.min_Year} 
                    name='min_Year' 
                    min='1' 
                    max='5' 
                    placeholder='Menor edad'
                    onChange={(e)=>handleChange(e)} 
                    required/>años 

                    <input type='number' 
                    value={input.max_Year} 
                    name='max_Year' 
                    min='2' 
                    max='20' 
                    placeholder='Mayor edad' 
                    onChange={(e)=>handleChange(e)} 
                    required/>años 
                    {errors.max_Year && (<p>{errors.max_Year}</p>)}

                </div>

                <div className="label">
                    <label>Imagen: </label>
                    <input type='text'
                    alt='not found' 
                    value={input.image} 
                    name='image' 
                    pattern='https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$' 
                    title='FORMATO URL'
                    placeholder='URL de imagen' 
                    onChange={(e)=>handleChange(e)} 
                    required/>
                </div>


                <div>
                    {[
                        input.temperament.map((e) =>
                            <div>
                                
                            <p key={e.id}> {temperaments.find((v) => v.id === e)?.name} </p> 
                            <button onClick={()=> handleDelete(e)}>X</button>
                            </div> )   
                    ]}
                    
            </div>

                
                <div>
                    <label>Temperamentos: </label>
                    <select onChange={(e) => handleSelect(e)}  value={input.temperament[input.temperament.length - 1] }  required>  
                        <option  value=''> Seleccione..</option>
                            {temperaments.map((e) => (
                        <option key={e.id} value={e.id} label={e.name}></option>
                            ))}
                    </select>                    
                </div>   */}

                <button type='submit'>Crear personaje</button>


            </form>

      

        </div>
    )

    }