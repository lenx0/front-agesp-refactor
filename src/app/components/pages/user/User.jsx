import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// const headerProps = {
//   icon: "users",
//   title: " Usuários",
//   subtitle: "Cadastro de usuários",
// };

/*json server
const baseUrl = "http://localhost:3001/users";*/

//API
const baseUrl = "https://aggesp-api.altogiro.net/v1/agesp";
const initialState = {
  user: {
    userName: "",
    name: "",
    email: "",
    password: "",
    sector: "",
    level: "",
    function: "",
    company: "",
  },
  list: [],
};

export default class User extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/user${"/list"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
      //axios.delete(`${baseUrl}/${user._id}`)
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  /*remove(user) {
    axios.delete(`${baseUrl}/${user.userName}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }*/

  save() {
    const user = this.state.user;
    const method = user._id ? "put" : "post";
    const url = user._id
      ? `${baseUrl}/user/update/${user._id}`
      : `${baseUrl}/user/create/`;
    console.log(method);
    console.log(url);
    console.log(user);
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
      console.log(resp.data);
      console.log(list);
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u._id !== user._id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Usuário</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                value={this.state.user.userName}
                onChange={(e) => this.updateField(e)}
                placeholder="Nome de usuário"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.user.password}
                onChange={(e) => this.updateField(e)}
                placeholder="**********"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o email..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Função</label>
              <input
                type="text"
                className="form-control"
                name="function"
                value={this.state.user.function}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite a função..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nível de acesso</label>
              <select
                type="text"
                className="form-control"
                name="level"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.user.level}</option>
                <option value="Administrador">Administrador</option>
                <option value="Gestor">Gestor</option>
                <option value="Colaborador">Colaborador</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Setor</label>
              <select
                type="text"
                className="form-control"
                name="sector"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.user.sector}</option>
                <option value="Aviamento">Aviamento</option>
                <option value="Gestor">Gestor</option>
                <option value="Colaborador">Colaborador</option>
                <option value="Almoxarifado">Almoxarifado</option>
                <option value="Aviamento">Aviamento</option>
                <option value="Comercial">Comercial</option>
                <option value="Compras">Compras</option>
                <option value="Corte">Corte</option>
                <option value="Costura">Costura</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="DP">DP</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Engenharias">Engenharias</option>
                <option value="Estilo">Estilo</option>
                <option value="Expedição">Expedição</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Fiscal">Fiscal</option>
                <option value="Lojas">Lojas</option>
                <option value="Marketing">Marketing</option>
                <option value="Modelagem">Modelagem</option>
                <option value="PCP">PCP</option>
                <option value="Portaria">Portaria</option>
                <option value="Qualidade">Qualidade</option>
                <option value="RH">RH</option>
                <option value="TI">TI</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Empresa</label>
              <select
                type="text"
                className="form-control"
                name="company"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.user.company}</option>
                <option value="Alto Giro">Alto Giro</option>
                <option value="AGLabs">AGLabs</option>
                <option value="Ampag">Ampag</option>
                <option value="Restaurante">Restaurante</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/user/delete/${user._id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Setor</th>
            <th>Nível de acesso</th>
            <th>Função na empresa</th>
            <th>Empresa</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.userName}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.sector}</td>
          <td>{user.level}</td>
          <td>{user.function}</td>
          <td>{user.company}</td>
          <td>
            <button
              className="btn btn-warning ml-2"
              onClick={() => this.load(user)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <BrowserRouter>
        {this.renderForm()}
        {this.renderTable()}
      </BrowserRouter>
    );
  }
}
