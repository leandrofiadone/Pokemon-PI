import styles from './Paginado.module.css'

export default function Paginado ({pokemonPerPage, tuttiPokemons, paginado}){
    const pageNumbers = [];

    for (let i=1; i<= Math.ceil(tuttiPokemons/pokemonPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav className={styles.nav}>
            <ul className= {styles.pagination}>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <div key={number}>
                    <li className={styles.number} key={number}>
                      <button onClick={() => paginado(number)} className={styles.pagButton}>{number}</button>
                    </li>
                  </div>
                ))}
            </ul>
        </nav>
    )
}