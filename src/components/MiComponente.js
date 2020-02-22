import React, { Component} from 'react';
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
            <h1>{'Receta: ' + receta.nombre}</h1>
            <h2>{'Caloria: ' + receta.calorias}</h2>
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
            <hr/>
            {this.props.saludo &&
              <React.Fragment>
              <h1>SALUDO DESDE UNA PROP:</h1>
              <h3>{this.props.saludo}</h3>
              </React.Fragment>
            }
          </div>

        );
    }
}

export default MiComponente;
