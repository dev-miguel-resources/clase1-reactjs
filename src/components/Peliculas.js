import React, {Component} from 'react';
import Pelicula from './Pelicula';


class Peliculas extends Component{

    state = {};

    //quiero modificar el estado del titulo
    cambiarTitulo = () => {

      var {peliculas} = this.state;
      peliculas[0].titulo = "Evil Parasite";

      this.setState({
        peliculas: peliculas
      });
    }

    favorita = (pelicula, indice) => {
      console.log("FAVORITA MARCADA");
      console.log(pelicula, indice); //me muestra lo que estoy recibiendo, que es la pelicula del hijo
        this.setState({
          favorita:pelicula //actualizo el state de favorita
        })
    }
    //para explicar el ciclo de vida: montar, renderiza y desmonta
    componentWillMount(){ //lo primero que se carga
      //alert("Se va a montar un componente");
      this.setState({
        peliculas: [
          { titulo: 'Parasite', image: 'https://arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/OS4YO5TIUBCR3FKQJ247YP6YK4.jpg'},
          { titulo: 'Joker', image: 'https://images.clarin.com/2019/09/13/joaquin-phoenix-muy-probable-candidato___DX5ZOhR4H_1256x620__1.jpg'},
          { titulo: 'Bird of Prey', image: 'https://cdn1-www.superherohype.com/assets/uploads/2020/01/Birds-of-Prey.jpg'}
        ],
          nombre: 'Miguel Chamorro',
          favorita: {}
      });
    }

    componentDidMount(){ //cuando ya se montó el componente
      //alert("Ya se ha montado el componente");
    }

    componentWillUnmount(){ //cuando ya se trabaje con rutas se irán desmontando los componentes
      alert("Me voy a desmontar");
    }

  render(){
    var pStyle = {
      background:'green',
      color:'white',
      padding: '10px'
    };

    var favorita;
    if(this.state.favorita.titulo){
      favorita = (
        <p className="favorita" style={pStyle}>
          <strong>La pelicula favorita es:</strong>
          <span>{this.state.favorita.titulo}</span>
        </p>
      );
    }else{
      favorita = (
          <p>NO HAY PELICULA FAVORITA</p>
      )
    }

    return (
        <div id="content" className="peliculas">

        <h2 className="subheader">Películas</h2>
        <p>Selección de las peliculas favoritas de {this.state.nombre}</p>
        <p><button onClick={this.cambiarTitulo}>
              Cambiar titulo a Parasite
              </button>
        </p>
        {/*
          this.state.favorita.titulo ? (
          <p className="favorita" style={pStyle}>
            <strong>La pelicula favorita es:</strong>
            <span>{this.state.favorita.titulo}</span>
          </p>
        ) : (
              <p>NO HAY PELICULA FAVORITA</p>
        )

        */} {/*condiciones de jsx*/}

            {favorita}


            {/*Crear componente de peliculas */}
            <div id="articles" className="peliculas">
            {
              this.state.peliculas.map((pelicula, i) => {
                return (
                <Pelicula key={i} pelicula={pelicula}
                  marcarFavorita = {this.favorita}
                  indice={i}
                />
              )
            })
          }
          </div>
        </div>
    );
  }
}

export default Peliculas;
