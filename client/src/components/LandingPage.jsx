import React from "react";
import {Link} from 'react-router-dom';
import styles from "./LandingPage.module.css";
import Pikachu from '../img/Pikachu.gif';
import Squirtle from '../img/Squirtle.gif'
import Charmander from '../img/Charmander.gif'
import Bulbasaur from '../img/Bulbasaur.gif'




export default function LandingPage(){

    return(

        <div className={styles.landing_page_container}>
            <h1 className={styles.titulo}>Welcome to Henry Pokedex</h1>
            
            <div>
			
            <img src={Charmander} alt="Charmander" height={130} width={130} />
            <img src={Bulbasaur} alt="Bulbasaur" height={130} width={130} />
            <img src={Squirtle} alt="Squirtle" height={130} width={130} />
            <img src={Pikachu} alt="Pikachu" height={130} width={130} />
            </div>
            
            
				
			    
				
                <p>
                <Link to='/home'>
				<button className={styles.button}>INGRESAR</button>
                </Link>
				</p>
                
            
                    
        </div>

        
    )
}