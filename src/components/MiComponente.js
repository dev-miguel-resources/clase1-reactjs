import React, { Component, Fragment } from 'react';
//fragment, alternativa a hacer un div

class MiComponente extends Component {
    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamón'],
            calorias: 400
        };
        return (
          <div className="mi-componente">
            <h1>{'Receta: ' + receta.nombre} < /h1>
            <h2>{'Caloria: ' + receta.calorias} < /h2>
            <ol>
            {
              receta.ingredientes.map((ingrediente, i) => {
                console.log(ingrediente);
                return (
                 <li key={i}>
                    {ingrediente}
                 </li>
               );
              })
            }
            </ol>
          </div>

        );
    }
}

export default MiComponente;
