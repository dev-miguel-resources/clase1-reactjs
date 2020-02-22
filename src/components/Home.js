import React, { Component } from 'react';

import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {
    render() {

        return (
            <div id="home">
                <Slider
                    title="Bienvenido al Curso de React con Miguel Chamorro"
                    btn="Ir al blog"
                    size="slider-big"
                />
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Últimos articulos</h1>
                        <Articles
                            home="true" //le estoy pasando esta prop a articles
                        />
                    </div>

                    <Sidebar
                    />

                </div>
            </div>
        );
    }
}

export default Home;