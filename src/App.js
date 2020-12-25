import React, { useState } from 'react';

//React router dom
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

//Importación hoja de estilos App
import './App.css';

//Importación librería Bulma
import 'bulma/css/bulma.css';
import 'antd/dist/antd.css';

//Importacion de containers & componentes
import Home from './containers/Home/Home';
import MovieList from './components/MovieList/MovieList';
import RentMovie from './containers/RentMovie/RentMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Logout from './containers/Logout/Logout';
import Order from './containers/Order/Order';

function App() {
  let initialUser = null;
  try {
    initialUser = JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error(error)
  }
  const [user, setUser] = useState(initialUser);


  return (
    <BrowserRouter>
      <Switch>
         <Route path='/logout' component={Logout} exact /> 
        <Route path='/order' component={Order} exact />
        <Route path='/' component={Home} exact />
        <Route path='/movielist' component={MovieList} exact />
        <Route path='/rentmovie' component={RentMovie} exact />
        <Route path='/moviedetail' component={MovieDetails} exact />
        <Route path='/register' component={Register} exact />
        <Route path='/login' component={Login} exact>
          <Login setUser={setUser} />
        </Route>
        <Redirect to="/" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
