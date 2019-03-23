import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../App';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    axiosInstance.post('/v1/persons', { name })
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    const { name } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Adicionar Pessoa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Lista de Pessoas</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="isbn">Nome:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Nome" />
              </div>
              <button type="submit" class="btn btn-default">Enviar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;