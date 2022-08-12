import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import moment from "moment"


// const headerProps = {
//   icon: "users",
//   title: "Vagas disponíveis",
//   subtitle: "Painel de aprovação",
// };

//const baseUrl = "http://localhost:3005/v1/agesp";
const baseUrl = "https://aggesp-api.altogiro.net/v1/agesp"
const initialState = {
  requester: [{
    vacancyDateOpen: "",
    positionOrFunction: "",
    sector: "",
    manager: "",
    responsible: "",
    hiringReason: "",
    replacedEmployee: "",
    initialSalary: "",
    status: "",
    admissionDate: "",
    vacancyDateClose: "",
  }],
  list: [],
};

export default class Vacancies extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
    });
  }

  clear() {
    this.setState({ requester: initialState.requester });
  }


  save() {
    const requester = this.state.requester;
    const method = requester._id ? "put" : "post";
    const url = requester._id
      ? `${baseUrl}/user/update/${requester._id}`
      : `${baseUrl}/user/create/`;
    console.log(method);
    console.log(url);
    console.log(requester);
    axios[method](url, requester).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ requester: initialState.requester, list });
      console.log(resp.data);
      console.log(list);
    });
  }

  getUpdatedList(requester, add = true) {
    const list = this.state.list.filter((u) => u._id !== requester._id);
    if (add) list.unshift(requester);
    return list;
  }

  updateField(event) {
    const requester = { ...this.state.requester };
    requester[event.target.name] = event.target.value;
    this.setState({ requester });
  }

  renderForm() {
    return (
      <div>
        <h1>Vagas cadastradas</h1>
      </div>
    );
  }

  load(requester) {
    this.setState({ requester });
  }

  remove(requester) {
    axios.delete(`${baseUrl}/vacancy/delete/${requester._id}`).then((resp) => {
      const list = this.getUpdatedList(requester, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <div className="scrollbar scrollbar-lady-lips">
        <div className="force-overflow">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Ações</th>
            <th>Abertura</th>
            <th>Cargo</th>
            <th>Setor</th>
            <th>Gestor</th>
            <th>Responsável</th>
            <th>Motivo</th>
            <th>A ser substituído</th>
            <th>Salário</th>
            <th>Status</th>
            <th>Admitido</th>
            <th>Fechamento</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
      </div>
      </div>
    );
  }

  renderRows() {
    return this.state.list.map((requester) => {
      return (
        <tr key={requester._id}>
          <td>
            {/* <button
              className="btn btn-success ml-2"
              id="btn-check"
              onClick={() => this.load(requester)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              id="btn-delete"
              onClick={() => this.remove(requester)}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button> */}
            <button
              className="btn btn-warning ml-2"
            >
              <i className="fa-solid fa-print"></i>
            </button>
          </td>
          <td>{moment(requester.vacancyDateOpen).format('DD.MM.YYYY')}</td>
          <td>{requester.positionOrFunction}</td>
          <td>{requester.sector}</td>
          <td>{requester.manager}</td>
          <td>{requester.responsible}</td>
          <td>{requester.hiringReason}</td>
          <td>{requester.replacedEmployee}</td>
          <td>{requester.initialSalary}</td>
          <td>{requester.status}</td>
          <td>{moment(requester.admissionDate).format('DD.MM.YYYY')}</td>
          <td>{moment(requester.vacancyDateClose).format('DD.MM.YYYY')}</td>
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
