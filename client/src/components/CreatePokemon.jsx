import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {postPokemon, getTypes} from "../actions/index"
import {useDispatch, useSelector} from "react-redux"
import styles from "./CreatePokemon.module.css"
import validaciones from "../components/CreatePokemonErrors"

export default function PokemonCreated() {
  const dispatch = useDispatch()
  const types = useSelector((state) => state.types)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch])

  const [input, setInput] = useState({
    nombre: "",
    imagen: "",
    vida: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    type: []
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validaciones({...input, [e.target.name]: e.target.value}))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value]
    })
  }

  function handleSubmit(submit) {
    submit.preventDefault()

    dispatch(postPokemon(input))
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
      type: []
    })
  }

  //className={styles.}

  return (
    <div className={styles.create_container}>
      <Link to="/home">
        <button className={styles.buttonform}>Volver</button>
      </Link>

      <h1 className={styles.create_title}>Detailed your pokemon</h1>

      <form className={styles.form_container} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.labelInput_cnt}>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.nombre}
            name="nombre"
            onChange={handleChange}
          />
        </div>
        {errors.nombre && <p className={styles.errorinput}> {errors.nombre}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Vida:</label>
          <input
            type="number"
            value={input.vida}
            name="vida"
            onChange={handleChange}
          />
        </div>
        {errors.vida && <p className="error-input">{errors.vida}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Ataque: </label>
          <input
            type="number"
            value={input.fuerza}
            name="fuerza"
            onChange={handleChange}
          />
        </div>
        {errors.fuerza && <p className="error-input">{errors.fuerza}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Defensa: </label>
          <input
            type="number"
            value={input.defensa}
            name="defensa"
            onChange={handleChange}
          />
        </div>
        {errors.defensa && <p className="error-input">{errors.defensa}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Speed: </label>
          <input
            type="number"
            value={input.velocidad}
            name="velocidad"
            onChange={handleChange}
          />
        </div>
        {errors.velocidad && <p className="error-input">{errors.velocidad}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Height: </label>
          <input
            type="number"
            value={input.altura}
            name="altura"
            onChange={handleChange}
          />
        </div>
        {errors.altura && <p className="error-input">{errors.altura}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Peso: </label>
          <input
            type="number"
            value={input.peso}
            name="peso"
            onChange={handleChange}
          />
        </div>
        {errors.peso && <p className="error-input">{errors.peso}</p>}

        <div className={styles.labelInput_cnt}>
          <label>Imagen: </label>
          <input
            alt="not found"
            value={input.imagen}
            name="imagen"
            pattern="https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$"
            title="FORMATO URL"
            placeholder="URL de imagen"
            onChange={handleChange}
          />
        </div>

        <div>
          <select
            className={styles.types_select}
            onChange={(selection) => handleSelect(selection)}>
            {types.map((typ) => (
              <option value={typ.nombre}>{typ.nombre}</option>
            ))}
          </select>
        </div>
        <div className={styles.selecciones}>
          <ul>
            <li>{input.type.map((seleccionado) => seleccionado + " ")}</li>
          </ul>
        </div>
        <button className={styles.buttonform} type="submit">
          Create Pokemon
        </button>
      </form>
    </div>
  )
}
