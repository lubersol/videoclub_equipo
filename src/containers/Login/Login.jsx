import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            let login = await axios.post('https://heroku-mongo-mi-atlas.herokuapp.com/api/user/login', { email, password });
            let token = await login.data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            props.setUser(email);
            notification.success({ message: 'Login correcto!', description: 'Bienvenido a mi videoclub ' })
            history.push('/')
        } catch (error) {
            console.error(error)
            notification.error({ message: 'Error', description: 'Ha habido un problema en el login' })
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
                    <p className="titular">Area cliente</p>
                </header>
                <div className="campo">
                    <input className="datos" type="email" onChange={event=>setEmail(event.target.value)} name="email" placeholder="Introduce tu email" required />
                </div>
                <div className="campo">
                    <input className="datos" type="password" onChange={event=>setPassword(event.target.value)} name="password" placeholder="Introduce una contraseña" required />
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

export default Login;
