import React from "react";

export default function Card({ name, sprite, id, tipo }) {
  return (
    <div>
    <div>
      
      <img src={sprite} alt="Img not found"  width="500px" heigth="550px"/>
      <h2>{name}</h2>
      <h3>{tipo}</h3>
  
    </div>
    </div>
  );
}