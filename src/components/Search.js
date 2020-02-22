import React, { Component } from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Search extends Component {

    render() {
        var searched = this.props.match.params.search; //atrapo el parametro por url
        var i = "ya basta key";
        return (
            <div id="blog">
                <Slider
                    title={'Busqueda: '+ searched}
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        {/*Listado de articulos que vendrán del api rest de node*/}
                    <Articles
                        search={searched} //le paso esta props a articles
                        key={i}
                    />
                 </div>

                    <Sidebar
                        blog="true"
                    />

                </div>
            </div>
        );
    }
}

export default Search;