import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

//Validación formularios y alertas

class CreateArticle extends Component {

    url = Global.url;

    titleRef = React.createRef(); //ahora ya puedo vincular los campos de mis formulario con mis propiedades 
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            }
        }); //dejamos cargado el objeto de simple react validator
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value, //extraigo los valores del form
                content: this.contentRef.current.value
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
            axios.post(this.url + 'save', this.state.article)
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
        if (this.state.status === 'success') {
            return <Redirect to="/blog" />; //me redirecciono al blog
        }
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear articulo</h1>
                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState}></input>

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="contenido" ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange}></input>
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success"></input>
                    </form>
                </section>

                <Sidebar />

            </div>
        )
    }
}

export default CreateArticle;