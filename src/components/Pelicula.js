import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//Componentes hijos quedan mucho mas limpios por props
class Pelicula extends Component{

  marcar = () => {
    this.props.marcarFavorita(this.props.pelicula
    , this.props.indice); //aca ya defino mi prop para pasar al padre
  }

  render(){
      const {titulo, image} = this.props.pelicula;

    return(
      <article className="article-item" id="article-template">
        <div className="image-wrap">
            <img src={image} alt={titulo} />
        </div>

        <h2>{titulo}</h2>
        <span className="date">
            Hace 5 minutos
        </span>
        <Link to="/blog">Leer más</Link>
        <button onClick={this.marcar}> {/*funcion que le envío al padre Peliculas*/}
          Marcar como favorita
        </button>

        <div className="clearfix"></div>
    </article>
    );
  }

}

export default Pelicula;
