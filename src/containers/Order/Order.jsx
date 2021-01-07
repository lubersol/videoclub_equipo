//import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import axios from 'axios';
import './Order.css';
import { notification } from 'antd';
import moment from 'moment';
//import { Link } from 'react-router-dom';


export default class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setMovie: {}
        }
    }
    componentDidMount() {
        const data = JSON.parse(localStorage.getItem('datosPelicula'))
        this.setState({ setMovie: data })
        console.log(data)
    }
    async rent() {
        const token = localStorage.getItem('access_token')
        const data = JSON.parse(localStorage.getItem('datosPelicula'))
        const URL = 'https://127.0.0.1:8000/api/rent';
        const order = {
            "userId": token.id,
            "movieId": data.id,
            "createdAt": moment().format(),
            "returnDate": moment().add(3, 'days').calendar()
        }
        if (!token) this.goBack()
        await axios.post(URL, order)
        console.log(order)
        notification['success']({
            message: "Pelicula añadida!"+ "debes devolverla el "+moment().add(3, 'days').calendar()
        })
        console.log(token);
    }

    goBack() {
        this.props.history.push('/')
    }

    showMovie() {
        if (this.state.setMovie?.id) {
            return (
                <div className="caratula">
                    <img className="imagen" alt={this.state.setMovie.title} src={`https://image.tmdb.org/t/p/w300${this.state.setMovie.poster_path}`}></img>
                    <div className="articles">
                        <article className="titulo"> {this.state.setMovie.title} </article>
                        <article className="dia"><p>Fecha de estreno: {this.state.setMovie.release_date}</p></article>
                        <article className="descripcion"><p>Sinopsis: {this.state.setMovie.overview}</p></article>
                        <article className="nota"><p>Nota media: {this.state.setMovie.vote_average}</p></article>
                        <article className="precio"><p>Precio: 3€</p></article>
                        <div className="containerAlquilar">
                            <button className="alquilar" onClick={() => this.rent()}>alquilar</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>CARGANDO...</div>
            )
        }
    }
    render() {
        return (
            <div>
                <button className="boton goBack" onClick={() => this.goBack()}>atras</button>
                <div className="containerGlobal">
                    {this.showMovie()}
                </div>
            </div>
        )
    }
}














// const Order = () => {
//     const [order, setOrder] = useState([]);
//     const token = localStorage.getItem('token')
//     useEffect(() => {
//         const options = {
//             headers: {
//                 Authorization: token
//             }
//         };
//         axios.get('https://heroku-mongo-mi-atlas.herokuapp.com/api/movie', options)
//             .then((res) => {
//                 console.log(res.data);
//                 setOrder(res.data.order);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }, [])

//     return (
//         <div className='orderProfile'>
//                 <header>
//                     <p className="titularGracias">¡Gracias por confiar en nosotros!</p>
//                 </header>
//                 <div className='infoOrder'>
//                     <div className='inside'>
//                         <p className="textoP">Disfruta  2 días de la película que has escogido.</p>
//                     </div>
//                     <div className='inside'>
//                         <p className="textoP">Esperamos volver a verte pronto.</p>
//                     </div>
//                 </div>
//             <div className="justifybutton">
//                 <Link to='/' className='botonInicio'>Inicio</Link>
//             </div>
//         </div>
//     );
// }

// export default Order;