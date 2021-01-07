import React from 'react';
import { useHistory } from "react-router";
import './Register.css';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';


const Register = () => {

    const history = useHistory();

    const handleSubmit = async event => {
        try {
            event.preventDefault();

             const body = {
                "email": event.target.email.value,
                "name": event.target.name.value,
                "password": event.target.password.value
             };
            console.log(body);
            await axios({
                method:'post',
                url: 'https://127.0.0.1:8000/api/user',
                headers:{},
                data:{
                "email": event.target.email.value,
                "name": event.target.name.value,
                "password": event.target.password.value
                }
            })
            // await axios.post('https://127.0.0.1:8000/api/user', body)
            notification.success({ message: 'Registrado!', description: 'Bienvenido! Te has registrado correctamente' })
            history.push('/login')
        } catch (error) {
            console.log(error)
        }
    }

return (
    <div className="containerForm">
        <header className="cabeceraBoton">
            <div className='botonCaja'>
                <Link to='/' className='boton_atras'>Volver atras</Link>
            </div>
        </header>
        <form className="formulario" onSubmit={handleSubmit}>
            <header className="cajaTitulo">
                <p className="titular">Registrarme</p>
            </header>
            <div className="campo">
                <input className="datos" type="text" name="name" placeholder="Introduce tu nombre" required />
            </div>
            <div className="campo">
                <input className="datos" type="email" name="email" placeholder="Introduce tu email" required />
            </div>
            <div className="campo">
                <input className="datos" type="password" name="password" placeholder="Introduce una contraseña" required />
            </div>
            <div className="campo">
                <button type="submit" className="enviar">
                    Enviar
                                </button>
            </div>
        </form>
    </div>
);
};

export default Register;
