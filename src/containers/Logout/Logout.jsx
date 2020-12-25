import React from 'react';
import './Logout.css';
import { useHistory } from "react-router";
import { notification } from 'antd';

const Logout = (props) => {

  const history = useHistory();

  try {
    localStorage.clear();
    props.setUser(null);
    notification.success({ message: 'Logout correcto!', description: 'Has salido de la aplicación. Hasta pronto!' });
    history.push('/');
  } catch (error) { 
    console.log(error);
    notification.error({ message: 'Error en el logout', description: 'Se ha producido un error al hacer el logout' });
  }


return (
  <div className='profile'>
    <div className='header'>
    </div>
    <div className='buttonsLogout'></div>
    <div className='logout'>
      <div>
        <button className='logout-button' >Logout</button>
      </div>
    </div>
  </div>
)
}

export default Logout;
