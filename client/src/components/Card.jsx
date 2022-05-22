import React from "react";
import styles from "./Card.module.css";
import styled from 'styled-components';

export default function Card({ name, sprite, id, types }) {

  function colorPicker(tipoPrincipal) {
		switch (tipoPrincipal) {
			case 'grass':
				return 'rgb(16, 150, 23, 0.5)';
				
			case 'fire':
				return 'rgb(224, 121, 10, 0.6)';
				

			case 'water':
				return 'rgb(10, 121, 224, 0.3)';
				

			case 'bug':
				return 'rgb(8, 65, 12, 0.5)';
				

			case 'electric':
				return 'rgb(208, 194, 8, 0.6)';
				

			case 'poison':
				return 'rgb(156, 64, 209, 0.6)';
				

			case 'fairy':
				return 'rgb(135, 61, 142, 0.7)';
				
			case 'normal':
				return 'rgb(182, 182, 182, 0.7)';
				
			case 'ground':
				return 'rgb(99, 41, 2, 0.54)';
				
			case 'ghost':
				return 'rgb(63, 14, 67, 0.55)';
				
			case 'flying':
				return 'rgb(113, 154, 182, 0.9)';
				
			case 'fighting':
				return 'rgb(97, 4, 21, 0.48)';
				
			case 'rock':
				return 'rgb(44, 24, 28, 0.6)';
				
			case 'steel':
				return 'rgb(60, 59, 59, 0.4)';
				
			case 'psychic':
				return 'rgb(223, 127, 226, 0.5)';
				
			case 'ice':
				return 'rgb(112, 215, 247, 0.4)';
				
			case 'dragon':
				return 'rgb(59, 63, 255, 0.6)';
				
			case 'dark':
				return 'rgb(48, 48, 49, 0.5)';
				
			case 'shadow':
				return '#0e0e37c5';
				
			default:
				return '#eee8e8a8';
		}
	}

	const Containercard = styled.div`
		text-transform: capitalize;
		font-family: 'Sono-ExtraBold';
		background-color: ${colorPicker(types[0])};
		display: flex;
		padding: 5px 10px;
		border-radius: 10px;
		justify-content: space-around;
		align-items: center;
		height: 300px;
		position: relative;
		max-width: 400px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		&:hover {
			transform: translateY(-3px);
			transition: 0.4s ease-in-out;
			box-shadow: 2px 3px 25px #FFCC00;
		}
	`;

  return (
    <Containercard>
    <div className={styles.container}>
              <div>
                
                <img  className={styles.img} src={sprite} alt="Img not found"  width="500px" heigth="550px"/>
                  <h2>{name}</h2>
                              <div>
                              {types?.map((e)=>{
                                return(
                                  <div>
                                    <span>{e}</span>
                                  </div>
                                      )
                                    })}
                              </div>
                </div>
    </div>
    </Containercard>
  
  );
}