import React from "react";

export default function Card({ name, sprite, id, types }) {
  return (
    <div>
    <div>
      
      <img src={sprite} alt="Img not found"  width="500px" heigth="550px"/>
      <h2>{name}</h2>
      <h3>{types}</h3>
  
    </div>
    </div>
  );
}