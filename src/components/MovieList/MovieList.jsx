import React, { Component, Fragment } from 'react';
import { notification } from 'antd';
import axios from 'axios';


class MovieList extends Component {
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

    async goRent() {
        //meter función if en caso de que no esté logueado!!
        const token = JSON.parse(localStorage.getItem('token'))
        const data = JSON.parse(localStorage.getItem('datosPelicula'))
        const URL = 'https://heroku-mongo-mi-atlas.herokuapp.com/api/order';
        const order = {
            "userId": token.id,
            "movieId": data.id
        }
        if (!token) this.goBack()
        await axios.post(URL, order)
        console.log(order);
        notification.success({
            message: "Pelicula añadida!"
        })
        console.log(token);
    }

    goBack() {
        this.props.history.push('/rentmovie');
    }

    getMovie() {
        if (this.state.movie?.id) {
            return (
                <div className="caratula">
                    <img className="imagen" alt={this.state.movie.title} src={`https://image.tmdb.org/t/p/w300${this.state.movie.poster_path}`}  ></img>
                    <div className="articles">
                        <article className="titulo"> {this.state.movie.title}
                        </article>
                        <article className="dia"><p>Fecha de estreno: {this.state.movie.release_date} </p></article>
                        <article className="descripcion"> {this.state.movie.overview} </article>
                        <article className="precio"><p>Precio: 3€</p></article>
                        <div className="containerAlquilar">
                            <button className="alquilar" onClick={() => this.goRent()}>alquilar</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>CARGANDO...</div>
            )
        }

    }

    render() {
        return (
            <Fragment>
                <button className="boton goBack" onClick={() => this.goBack()}>atras</button>
                <div className="containerGlobal">
                    {this.getMovie()}
                </div>
            </Fragment>
        )
    }
}

export default MovieList;






