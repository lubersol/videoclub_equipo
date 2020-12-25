import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Order.css';
import { Link } from 'react-router-dom';



const Order = () => {
    const [order, setOrder] = useState([]);
    const token = localStorage.getItem('token')
    useEffect(() => {
        const options = {
            headers: {
                Authorization: token
            }
        };
        axios.get('https://heroku-mongo-mi-atlas.herokuapp.com/api/movie', options)
            .then((res) => {
                console.log(res.data);
                setOrder(res.data.order);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className='orderProfile'>
                <header>
                    <p className="titularGracias">¡Gracias por confiar en nosotros!</p>
                </header>
                <div className='infoOrder'>
                    <div className='inside'>
                        <p className="textoP">Disfruta  2 días de la película que has escogido.</p>
                    </div>
                    <div className='inside'>
                        <p className="textoP">Esperamos volver a verte pronto.</p>
                    </div>
                </div>
            <div className="justifybutton">
                <Link to='/' className='botonInicio'>Inicio</Link>
            </div>
        </div>
    );
}

export default Order;