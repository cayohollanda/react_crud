import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../App';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {}
    };
  }

  componentDidMount() {
    axiosInstance.get('/v1/persons/'+this.props.match.params.id)
      .then(res => {
        this.setState({ person: res.data.data });
      });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({person: state.person});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { person } = this.state.person;

    axiosInstance.put('/v1/persons', { person })
      .then((result) => {
        this.props.history.push("/show/"+this.props.match.params.id)
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar Pessoa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.person.id}`}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Lista de Usuários</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <input type="hidden" name="id" value={this.state.person.ID} onChange={this.onChange} />

                <label for="name">Nome:</label>
                <input type="text" class="form-control" name="name" value={this.state.person.name} onChange={this.onChange} placeholder="Nome" />
              </div>
              <button type="submit" class="btn btn-default">Update</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;