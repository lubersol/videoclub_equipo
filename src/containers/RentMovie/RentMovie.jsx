/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RentMovie.css';


class RentMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            page: 1
        }
    }

    async componentDidMount() {
        try {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3e62fb2a0d94f7fd5ade1348729a33cf&language=es-ES&page=${this.state.page}`);
            console.log(movies.data.results);
            this.setState({ movies: movies.data.results })
        } catch (err) {
            console.log(err);
        }
    }

    showMovies() {
        if (this.state.movies[0]) {
            return (
                this.state.movies.map(movie => {
                    console.log(movie.title)
                    return (
                        <div className="grid" key={movie.id}>
                            <img alt={movie.title} src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} onClick={() => this.selectMovie(movie)}></img>
                        </div>
                    )
                }))
        } else {
            return (<div>LOADING....</div>)
        }
    }

    selectMovie(movie) {
        this.props.history.push('/moviedetail');
        localStorage.setItem('datosPelicula', JSON.stringify(movie));
    }

    nextPage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }), () => {
            this.componentDidMount(this.state.page)
        })
    }

    backPage = () => {
        this.setState(prevState => ({ page: prevState.page - 1 }), () => {
            this.componentDidMount(this.state.page)
        })
    }

    render() {
        return (
            <Fragment>
                <header>
                    <p className="titular">Seleccion de peliculas</p>
                </header>
                <div className="cajaBotones">
                    <button className="boton" onClick={() => this.backPage()}>anterior</button>
                    <Link to='/' className='boton'>inicio</Link>
                    <button className="boton" onClick={() => this.nextPage()}>siguiente</button>
                </div>
                <div className="gridCartel" >{this.showMovies()}</div>
            </Fragment>
        );
    };


};
export default RentMovie;
