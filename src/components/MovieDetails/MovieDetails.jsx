import React, { Component } from 'react'
import './MovieDetails.css';

class Moviedetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    };
    componentDidMount() {
        let resultado = JSON.parse(localStorage.getItem('datosPelicula'));

        this.setState({ movie: resultado });
    }

    goBack() {
        this.props.history.push('/rentmovie');
    }

    goRent() {
        this.props.history.push('/order')
    }

    pickMovie() {
        if (this.state.movie?.id) {
            return (
                <div className="caratula">
                    <img className="imagen" alt={this.state.movie.title} src={`https://image.tmdb.org/t/p/w300${this.state.movie.poster_path}`}></img>
                    <div className="articles">
                        <article className="titulo"> {this.state.movie.title} </article>
                        <article className="dia"><p>Fecha de estreno: {this.state.movie.release_date} </p></article>
                        <article className="descripcion"><p>Sinopsis: {this.state.movie.overview} </p></article>
                        <article className="precio"><p>Precio: 3€</p></article>
                        <div className="containerAlquilar">
                            <button className="alquilar" onClick={() => this.goRent()}>alquilar</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>CARGANDO DATOS...</div>
            )
        }
    }
    render() {
        return (
            <div>
                <button className="boton goBack" onClick={() => this.goBack()}>atras</button>
                <div className="containerGlobal">
                    {this.pickMovie()}
                </div>
            </div>
        )
    }
}

export default Moviedetails;
