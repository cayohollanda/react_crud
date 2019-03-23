import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    axiosInstance.get('/v1/persons')
      .then(res => {
        this.setState({ persons: res.data.data });
        console.log(this.state.persons);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Lista de Pessoas
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Adicionar Pessoa</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nome</th>
                </tr>
              </thead>
              <tbody>
                {this.state.persons.map(u =>
                  <tr>
                    <td><Link to={`/show/${u.ID}`}>{u.name}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
export var axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});