import React, { useContext } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { AuthContext } from './app/context/Auth.jsx';
import "./App.css";

/* Paginas */
import Login from './app/login/Login';
import NovaConta from './app/novaConta/NovaConta';
import ResetSenha from './app/resetSenha/ResetSenha';
import Home from './app/home/Home'
import User from './app/components/pages/user/User'
import Vacancy from './app/components/pages/vacancy/Vacancies'
import Dashboard from './app/components/pages/dashboard/Dashboard'


// import NovoCliente from './app/NovoCliente/novocliente';
// import EditarCliente from './app/EditarCliente/editarcliente';
// import Site from './site/site.jsx';
// import Home from './app/Home/home';


function App(){
    const {logado} = useContext(AuthContext);

    function SecureRoute({...params}){
      if (!logado){
        return <Redirect to="/" />
      } else {
      return <Route {...params} />
      }
    }
    
    return <BrowserRouter>
    <Switch>
      <SecureRoute exact path='/app/home' component={Home} />
      <SecureRoute exact path='/app/user' component={User} />
      <SecureRoute exact path='/app/vacancies' component={Vacancy} />
      <SecureRoute exact path='/app/dashboard' component={Dashboard} />


      <Route exact path='/' component={Login} />
      <Route exact path='/app/novaconta' component={NovaConta} />    
      <Route exact path='/app/resetsenha' component={ResetSenha} />
      
      {/* 
      <SecureRoute exact path='/app/novocliente' component={NovoCliente} />
      <SecureRoute exact path='/app/editarcliente/:id' component={EditarCliente} /> */}
      </Switch>
    </BrowserRouter>;
  }

export default App;