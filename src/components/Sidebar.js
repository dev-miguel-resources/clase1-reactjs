import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class Sidebar extends Component {

  searchRef = React.createRef(); //creo la referencia para obtener el valor de la ref

  state = {
    search: "",
    redirect: false
  };

  redirectToSearch = (e) => {
    e.preventDefault(); //prevengo la acción de recargar al enviar

    this.setState({
      search: this.searchRef.current.value, //extraigo lo que llenó el usuario
      redirect: true
    });
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to={'/redirect/' + this.state.search} />
      );
    }
    return (
      <aside id="sidebar">
        {this.props.blog === "true" &&
          <div id="nav-blog" className="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <Link to={'/blog/crear'} className="btn btn-success">Crear artículo</Link>
          </div>
        }


        <div id="search" className="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra el artículo que buscas</p>
          <form onSubmit={this.redirectToSearch}> {/*voy a enviar de acuerdo a este metodo*/}
            <input type="text" name="search" ref={this.searchRef} /> {/*referencio mi name con esa propiedad, para extraer el valor*/}
            <input type="submit" name="submit" value="Buscar" className="btn" />
          </form>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
