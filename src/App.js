import React from 'react';
import './assets/css/App.css';

//IMPORTAR COMPONENTES
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
//import SeccionPruebas from './components/SeccionPruebas';
//import Peliculas from './components/Peliculas';
import Router from './Router';

function App() {
var buttonString = "Ir al blog";

    return (
      <div className = "App" >
      <Header/>
      <Slider
        title="Bienvenido al Curso de React con Escalab Academy de Miguel Chamorro"
        btn={buttonString}
      />
      <div className="center">

        <Router />

        {/*
          <Peliculas/>
        */}


        <Sidebar/>

        <div className="clearfix"></div>
        </div> {/*END DIV CENTER*/}
        <Footer/>
      </div>
    );
}

export default App;
