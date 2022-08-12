import "./Home.css";
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/Auth';

export default function Home() {
    const {setLogado} = useContext(AuthContext);
  function Logout() {
    setLogado(false);
    localStorage.removeItem("logado");
  }

  return (
    <nav className="menu">
      <Link to="/app/dashboard">
        <i className="fa fa-chart-line"></i> Dashboard
      </Link>
      <Link to="/app/users">
        <i className="fa fa-users"></i> Usuários
      </Link>
      <Link to="/app/vacancies">
        <i className="fa fa-user-tie"></i> Vagas
      </Link>
      <Link to="/app/login">
        <i className="fa fa-key" onClick={Logout}></i> Sair
      </Link>
    </nav>
  );
}
