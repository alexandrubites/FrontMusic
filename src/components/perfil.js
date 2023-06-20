import React from 'react';
import "../styles/Inicio.css"
import "../styles/Alumno.css"

export const Imagen = () => {
  return (
    <div className="imagen"></div>
  );
};


export const Alumno = () => {
  return (
    <div className="Alumno">
      <div className="TarjetaFoto">
        <img src="./Yo1.jpg" alt="Foto mía" className="Foto"></img>
        <div className="Info">
          <p className="Matricula">Vladimir Alexander Garcia</p>
          <p className="Matricula">S18003199</p>
          <p className="Escolaridad">Python, Django & React</p>
        </div>
      </div>
    </div>
  );
}
