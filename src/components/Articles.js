import React, { Component } from 'react';
import axios from 'axios'; //para hacer mis peticiones http
import { Link } from 'react-router-dom'; //para navegar a una ruta
import Moment from 'react-moment';
import 'moment/locale/es';
import Global from '../Global';
import ImageDefault from '../assets/images/default-image.png';




class Articles extends Component {

    url = Global.url;

    state = { //defino mi state
        articles: [],
        status: null
    };

    componentWillMount() { //cargalo antes de que se renderice la vista
        var home = this.props.home;
        var search = this.props.search; //guardo la props que viene de Search
        if (home === 'true') {
            this.getLastArticles();
        } else if (search && search !== null && search !== undefined) {
            this.getArticlesBySearch(search); //articulo buscado
        } else {
            this.getArticles(); //muestro todos los articulos
        }
    }


    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => { //cuando la petición se haga correctamente
                this.setState({
                    articles: res.data.articles, //el contenido de mis ultimos articulos
                    status: 'success'
                });
            });
    }


    getArticlesBySearch = (searched) => {
        axios.get(this.url + "search/" + searched)
            .then(res => { //cuando la petición se haga correctamente

                    this.setState({
                        articles: res.data.articles, //el contenido de mis ultimos articulos
                        status: 'success'
                    });
                    console.log(this.state);
            })
            .catch(err => {
                //console.log(err.response.data); //puedo ver el contenido del error
                this.setState({
                    articles: [], //los dejo vacíos
                    status: 'success'
                });
            });
    }


    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => { //cuando la petición se haga correctamente
                this.setState({
                    articles: res.data.articles, //el contenido de mis articulos
                    status: 'success'
                });
                console.log(this.state);
            });
    }

    render() {
        if (this.state.articles.length >= 1) {
            var listArticles = this.state.articles.map((article) => {
                return (
                    //https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8"
                    <article key={article._id} className="article-item" id="article-template" >
                        <div className="image-wrap">
                            {
                                article.image !== null ? (
                                    <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                ) : (
                                        <img src={ImageDefault} alt="Paisaje" />
                                    )
                            }

                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment locale="es" fromNow>
                                {article.date}
                            </Moment>
                        </span>
                        <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>

                );
            });
            return (
                <div id="articles" >

                    {listArticles}

                </div>
            );
        } else if (this.state.articles.length === 0 && this.state.status === 'success') {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavía no hay contenido en esta sección</p>

                </div>
            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el componente</p>

                </div>
            );
        }

    }
}

export default Articles;