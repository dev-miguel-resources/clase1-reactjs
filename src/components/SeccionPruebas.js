import React, {Component} from 'react';
//IMPORTACIÓN DE COMPONENTES
import MiComponente from './MiComponente';


class SeccionPruebas extends Component{

  contador = 0;

  state = { //state me sirve para manejar el estado de una propiedad dinamicamente
    contador: 0
  };


  /* //forma larga
  constructor(props){
    super(props);

    this.state = { //state me sirve para manejar el estado de una propiedad dinamicamente
      contador: 0
    };
  }
  */
  //PUEDO DEFINIR FUNCIONES
  HolaAlumnos(nombre, edad) {
      var presentacion = (
        <div>
          <h2> Hola, soy { nombre } < /h2>
          <h3> Tengo { edad } años < /h3>
          </div >
      );

      return presentacion;
  }

  sumar = (e) => {
    //this.contador = this.contador+1;
    //this.state.contador = this.state.contador + 1;
    this.setState({
      contador: (this.state.contador + 1)
    });
  }

  restar = (e) => {
    //this.contador = this.contador-1;
    //this.state.contador = this.state.contador - 1;
    this.setState({ //con el set state modifico el estado de una propiedad dinamicamente
      contador: (this.state.contador - 1)
    });
  }

  render(){
    var nombre = "Miguel Chamorro";
    return (
      <section id="content">
      <h2 className="subheader">Últimos artículos</h2>
        <p> Hola, bienvenido al curso de Escalab Academy </p>
        <h2 className="subheader">Funciones y JSX Básico</h2>
        {this.HolaAlumnos(nombre, 12)}
        <h2 className="subheader">Componentes</h2>
        <section className = "componentes" >

        <MiComponente / >
        <MiComponente / >

      </section>
      <h2 className="subheader">Estado</h2>
      <p>
        Contado: {this.state.contador}
      </p>
      <p>
        <input type="button" value="Sumar" onClick={this.sumar}></input>
        <input type="button" value="Restar" onClick={this.restar}></input>
      </p>
      </section>
    );
  }
}

export default SeccionPruebas;
