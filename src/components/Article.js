import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import 'moment/locale/es';
import ImageDefault from '../assets/images/default-image.png';
import swal from 'sweetalert';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    };

    componentWillMount() { //cuando el componente se vaya a montar
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id; //recojo el id

        //cuando ya lo tengo
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article, //recibo el articulo obtenido de la res
                    status: 'success'
                });
            }).catch(err => {
                this.setState({
                    article: false,
                    status: 'error'
                });
            });
    }

    deteleArticle = (id) => { //función para eliminar el articulo por id

        swal({
            title: "¿Estás seguro?",
            text: "¿Borrarás permanentemente tu articulo?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });

                            swal( //la lanzo cuando guarde un articulo
                                'Articulo eliminado',
                                'El articulo ha sido eliminado correctamente',
                                'success'
                            )
                        });
                } else {
                    swal( 
                        'Tranquilo!!!',
                        'No se ha borrado nada',
                        'success'
                    )
                }
            });

        /*axios.delete(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'deleted'
                });

                swal( //la lanzo cuando guarde un articulo
                    'Articulo eliminado',
                    'El articulo ha sido eliminado correctamente',
                    'success'
                )
            });
            */
    }

    render() {

        if (this.state.status === 'deleted') {
            return (<Redirect to="/blog" />)
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">

                    {article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image !== null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                            <img src={ImageDefault} alt={article.title} />
                                        )
                                }
                            </div>

                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale="es" fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>

                            <button onClick={
                                () => {
                                    this.deteleArticle(article._id)
                                }
                            } className="btn btn-danger">Eliminar</button>
                            <Link to={'/blog/editar/'+article._id} className="btn btn-warning">Editar</Link>


                            <div className="clearfix"></div>
                        </article>
                    }
                    {!this.state.article && this.state.status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El articulo no existe</h2>
                            <p>Intentalo de nuevo mas tarde</p>
                        </div>

                    }

                    {this.state.status == null &&
                        <div id="article">
                            <h2 className="subheader">Cargando...</h2>
                            <p>Espero unos segundos</p>
                        </div>

                    }



                </section>

                <Sidebar />

            </div>
        );
    }

}

export default Article; 
