import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../App';

class Show extends Component {

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
        console.log(this.state.person);
      });
  }

  delete(id){
    console.log(id);
    axiosInstance.delete('/v1/persons/'+id)
      .then((result) => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Detalhes da Pessoa
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Lista de Pessoas</Link></h4>
            <dl>
              <dt>Name:</dt>
              <dd>{this.state.person.name}</dd>
            </dl>
            <Link to={`/edit/${this.state.person.ID}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.person.ID)} class="btn btn-danger">Remover</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;