import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import ImageDefault from '../assets/images/default-image.png';

//1. Tenemos que recoger el id del articulo a editar de la url
//2. Tenemos que crear un método para sacar ese objeto del backend
//3. Tenemos que rellenar el formulario con esos datos
//4. Tenemos que actualizar el objeto haciendo una petición al backend

class EditArticle extends Component {

    url = Global.url;
    articleId = null;

    titleRef = React.createRef(); //ahora ya puedo vincular los campos de mis formulario con mis propiedades 
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.articleId = this.props.match.params.id; //capturo el id de la url
        this.getArticle(this.articleId);
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            }
        }); //dejamos cargado el objeto de simple react validator
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value, //extraigo los valores del form
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages(); //muestro los mensajes de validacion
        this.forceUpdate(); //que no fuerce la actualización del formulario
    }

    saveArticle = (e) => {
        e.preventDefault();
        //alert(this.titleRef.current.value);
        //rellenar el state por medio del formulario
        this.changeState();

        if (this.validator.allValid()) {
            //hacer una petición http por post para guardar el articulo
            axios.put(this.url + 'article/'+this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) { //si he recibido mi article
                        this.setState({
                            article: res.data.article, //guardo el article de la res
                            status: 'waiting'
                        });

                        swal( //la lanzo cuando guarde un articulo
                            'Articulo creado',
                            'El Articulo ha sido creado correctamente',
                            'success'
                        )

                        //subir la imagen
                        if (this.state.selectedFile !== null) {
                            //sacar el id del articulo guardado
                            var articleId = this.state.article._id;
                            //crear form data y añadir fichero
                            const formData = new FormData(); //creamos un formulario
                            formData.append( //le vinculamos un fichero
                                'file0',
                                this.state.selectedFile, //fichero a subir
                                this.state.selectedFile.name //con el nombre que lo voy a subir
                            );
                            //peticion ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) { //actualizo el estado de mi state
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'  //cuando ya lo subo lo paso a exitoso
                                        });
                                    } else {
                                        this.setState({
                                            status: 'failed'
                                        });
                                    }
                                });

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
        } else {
            this.setState({
                status: 'failed'
            });
            this.validator.showMessages(); //muestro los mensajes de validacion
            this.forceUpdate(); //que no fuerce la actualización del formulario
        }
    }

    fileChange = (event) => {
        //console.log(event);
        this.setState({
            selectedFile: event.target.files[0] //actualizamos el state con la imagen seleccionada
        });
        //console.log(this.state);
    }

    render() {
        console.log(this.state.article); //ya queda relleno mi state
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />; //me redirecciono al blog
        }
        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>
                    {this.state.article.title &&
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState}></input>

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="contenido" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>
                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange}></input>
                                <div className="image-wrap">
                                    {
                                        article.image !== null ? (
                                            <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                        ) : (
                                                <img src={ImageDefault} alt={article.title} className="thumb" />
                                            )
                                    }
                                </div>
                            </div>

                            <div className="clearfix"></div>        

                            <input type="submit" value="Guardar" className="btn btn-success"></input>
                        </form>
                    }

                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>

                <Sidebar />

            </div>
        )
    }
}

export default EditArticle;